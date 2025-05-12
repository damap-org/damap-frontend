import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Tree data
 */
export class TreeData {
  id: string;
  label: string;
  children?: TreeData[];
}

export class TreeNodeItem {
  id: string;
  label: string;
}

/**
 * Tree node
 */
export class TreeNode {
  children: TreeNode[];
  item: TreeNodeItem;
  visible: boolean;
}

/** Flat tree node with expandable and level information */
export class TreeFlatNode {
  item: { id: string; label: string };
  level: number;
  visible: boolean;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a tree item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class TreeDatabase {
  dataChange = new BehaviorSubject<TreeNode[]>([]);

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  initialize(TREE_DATA: TreeData[]) {
    // Build the tree nodes from Json object. The result is a list of `TreeNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a subtree of a Json object.
   * The return value is the list of `TreeNode`.
   */
  buildFileTree(data: TreeData[], level: number): TreeNode[] {
    return Object.keys(data).reduce<TreeNode[]>((accumulator, key) => {
      const node = new TreeNode();
      node.item = { id: data[key].id, label: data[key].label };
      node.visible = true;

      if (data[key].children) {
        node.children = this.buildFileTree(data[key].children, level + 1);
      }

      return accumulator.concat(node);
    }, []);
  }

  /**
   * Notify tree data change when searching
   */
  filterTree() {
    this.dataChange.next(this.data);
  }
}

/**
 * Searchable select form field with tree structured options, shows selected options as chip list.
 */
@Component({
  selector: 'app-tree-select-form-field',
  templateUrl: './tree-select-form-field.component.html',
  styleUrls: ['./tree-select-form-field.component.css'],
  providers: [TreeDatabase],
  standalone: false,
})
export class TreeSelectFormFieldComponent implements OnInit {
  /** Map from flat node to nested node. This helps us find the nested node to be modified */
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();

  treeControl: FlatTreeControl<TreeFlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

  searchFilter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input() label: string;
  @Input() treeData: TreeData[];
  /** Preselected options */
  @Input() state: TreeNodeItem[];

  /** Outputs all currently selected values (used for GET query) */
  @Output() params = new EventEmitter<TreeNodeItem[]>();

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeFlatNode>(true /* multiple */);
  /**
   * The selection used for the form field and GET query
   * Stores selected top nodes only
   */
  selectionList: TreeFlatNode[] = [];

  constructor(private _database: TreeDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<TreeFlatNode>(
      this.getLevel,
      this.isExpandable,
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener,
    );

    // Update form field selection
    this.checklistSelection.changed
      .pipe(
        debounceTime(50), // emits twice on change
      )
      .subscribe(_ => {
        this.setSelectionList();
        this.updateAndEmitParams();
      });
  }

  ngOnInit(): void {
    if (this.treeData) {
      this._database.initialize(this.treeData);
    }
    this._database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    this.searchFilter
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(text => {
        const data = this._database.data;
        for (const node of data) {
          this.filterTree(node, text);
        }
        this._database.filterTree();
      });
    // Set initial selection
    if (this.state) {
      this.setSelection();
    }
  }

  getLevel = (node: TreeFlatNode) => node.level;

  isExpandable = (node: TreeFlatNode) => node.expandable;

  getChildren = (node: TreeNode): TreeNode[] => node.children;

  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeFlatNode) =>
    _nodeData.item.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TreeFlatNode();
    flatNode.item = node.item;
    flatNode.visible = node.visible;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return (
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      })
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child),
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the item selection. Select/deselect all the descendants node */
  itemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf item selection. Check all the parents to see if they changed */
  leafItemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeFlatNode): void {
    let parent: TreeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeFlatNode): TreeFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Find top nodes in checklistSelection and store them in selectionList */
  private setSelectionList() {
    this.selectionList = [];
    for (const item of this.checklistSelection.selected) {
      const parent = this.getParentNode(item);
      if (
        parent == null ||
        !this.checklistSelection.selected.includes(parent)
      ) {
        this.selectionList.push(item);
      }
    }
  }

  private updateAndEmitParams() {
    const params: TreeNodeItem[] = [];
    for (const item of this.selectionList) {
      params.push(item.item);
    }
    this.params.emit(params);
  }

  applyFilter(event: Event) {
    let filterText = (event.target as HTMLInputElement).value;
    filterText = filterText ?? '';
    this.searchFilter.next(filterText);
  }

  private filterTree(node: TreeNode, filterText: string) {
    node.visible = node.item.label
      .toLowerCase()
      .includes(filterText.toLowerCase());
    if (!node.visible && node.children) {
      for (const child of node.children) {
        if (child.children) {
          this.filterTree(child, filterText);
        } else {
          child.visible = child.item.label
            .toLowerCase()
            .includes(filterText.toLowerCase());
        }
        node.visible = child.visible || node.visible;
      }
    }
  }

  /** Preselect options based on state input value (on component initialization) */
  setSelection() {
    this.checklistSelection.clear();
    for (const selected of this.state) {
      for (const flatNode of this.nestedNodeMap.values()) {
        if (flatNode.item.id === selected.id) {
          this.itemSelectionToggle(flatNode);
        }
      }
    }
  }
}
