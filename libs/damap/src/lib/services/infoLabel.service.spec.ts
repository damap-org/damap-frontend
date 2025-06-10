import { TestBed } from '@angular/core/testing';
import { InfoLabelService } from './infoLabel.service';
import { InfoBoxDetails } from '../domain/infoBox-details';
import { mockTemplate } from '../mocks/template-mocks';

describe('InfoLabelService', () => {
  let service: InfoLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return project info for index 0', () => {
    const result: InfoBoxDetails = service.getInfo(0);
    expect(result.greeting).toBe('Hi Firstname, let’s get started');
    expect(result.summaryLine).toBe(
      'Begin creating your DMP by identifying your project.',
    );
    expect(result.stepNumber).toBe(1);
  });

  it('should return people info for index 1', () => {
    const result: InfoBoxDetails = service.getInfo(1);
    expect(result.greeting).toBe('Welcome to Step 2, Firstname');
    expect(result.summaryLine).toBe('Identify team members in your project.');
    expect(result.stepNumber).toBe(2);
  });

  it('should return data specify info for index 2', () => {
    const result: InfoBoxDetails = service.getInfo(2);
    expect(result.greeting).toBe('Let’s talk about data, Firstname');
    expect(result.summaryLine).toBe('Describe your research data.');
    expect(result.stepNumber).toBe(3);
  });

  it('should return data specify info for index 2', () => {
    const result: InfoBoxDetails = service.getInfo(3);
    expect(result.greeting).toBe('Now onto Step 4, Firstname');
    expect(result.summaryLine).toBe(
      'Outline how your data will be organised throughout the project.',
    );
    expect(result.stepNumber).toBe(4);
  });

  it('should return costs info for index 9', () => {
    const result: InfoBoxDetails = service.getInfo(4);
    expect(result.greeting).toBe(
      'Step 5, Let’s elaborate on your storage, Firstname',
    );
    expect(result.summaryLine).toBe(
      'Define who can access and modify your data and describe your storage and backup strategies.',
    );
    expect(result.stepNumber).toBe(5);
  });

  it('should return end info for index 10', () => {
    const result: InfoBoxDetails = service.getInfo(5);
    expect(result.greeting).toBe(
      'On to Step 6, you’re halfway there, Firstname!',
    );
    expect(result.summaryLine).toBe(
      'Address important legal and ethical dimensions of your project.',
    );
    expect(result.stepNumber).toBe(6);
  });

  it('should return project info for an invalid index', () => {
    const result: InfoBoxDetails = service.getInfo(6);
    expect(result.greeting).toBe('Advancing to Step 7, Firstname');
    expect(result.summaryLine).toBe(
      'Elaborate on future access to your data. ',
    );
    expect(result.stepNumber).toBe(7);
  });

  it('should return project info for an invalid index', () => {
    const result: InfoBoxDetails = service.getInfo(7);
    expect(result.greeting).toBe('Step 8, Firstname');
    expect(result.summaryLine).toBe(
      'Choose suitable repositories for your data.',
    );
    expect(result.stepNumber).toBe(8);
  });

  it('should return project info for index greater than 10', () => {
    const result: InfoBoxDetails = service.getInfo(8);
    expect(result.greeting).toBe('On to Step 9, Firstname');
    expect(result.summaryLine).toBe(
      'Image/Describe potential reuse opportunities of your data. or  Imagine/Describe conceivable purposes for the reuse of your data.',
    );
    expect(result.stepNumber).toBe(9);
  });

  it('should return project info for index greater than 10', () => {
    const result: InfoBoxDetails = service.getInfo(9);
    expect(result.greeting).toBe('Step 10, you’re almost there, Firstname!');
    expect(result.summaryLine).toBe(
      'Estimate the costs for data management in this project. ',
    );
    expect(result.stepNumber).toBe(10);
  });

  it('should return project info for index greater than 10', () => {
    const result: InfoBoxDetails = service.getInfo(10);
    expect(result.greeting).toBe('Finally, let’s review your work, Firstname');
    expect(result.summaryLine).toBe('Check if you covered everything.');
    expect(result.stepNumber).toBe(11);
  });

  it('should return project info for index greater than 10', () => {
    const result: InfoBoxDetails = service.getInfo(15);
    expect(result.greeting).toBe('Hi Firstname, let’s get started');
    expect(result.summaryLine).toBe(
      'Begin creating your DMP by identifying your project.',
    );
    expect(result.stepNumber).toBe(1);
  });
});
