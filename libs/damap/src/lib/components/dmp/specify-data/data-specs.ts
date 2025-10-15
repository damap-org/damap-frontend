export const FILE_TYPES = {
  STANDARD_OFFICE_DOCUMENTS: {
    id: 'STANDARD_OFFICE_DOCUMENTS',
    label: 'Standard office documents',
    description: 'text documents, spreadsheets, presentations',
  },
  STRUCTURED_TEXT: {
    id: 'STRUCTURED_TEXT',
    label: 'Structured text',
    description: 'CSV, JSON, etc.',
  },
  IMAGES: {
    id: 'IMAGES',
    label: 'Images',
    description: 'JPEG, JPEG2000, GIF, TIF, PNG, SVG, etc.',
  },
  AUDIOVISUAL_DATA: {
    id: 'AUDIOVISUAL_DATA',
    label: 'Audiovisual data',
    description: 'WAVE, MP3, MP4, Flash, etc.',
  },
  RAW_DATA: {
    id: 'RAW_DATA',
    label: 'Raw data',
    description: 'device specific output',
  },
  NETWORKBASED_DATA: {
    id: 'NETWORKBASED_DATA',
    label: 'Networkbased data',
    description: 'websites, email, chat history, etc.',
  },
  DATABASES: {
    id: 'DATABASES',
    label: 'Databases',
    description: 'DBASE, MS Access, Oracle, MySQL, etc.',
  },
  STRUCTURED_GRAPHICS: {
    id: 'STRUCTURED_GRAPHICS',
    label: 'Structured graphics',
    description: 'CAD, CAM, 3D, VRML, etc.',
  },
  SCIENTIFIC_STATISTICAL_DATA: {
    id: 'SCIENTIFIC_STATISTICAL_DATA',
    label: 'Scientific and statistical data formats',
    description: 'SPSS, FITS, GIS, etc.',
  },
  PLAIN_TEXT: {
    id: 'PLAIN_TEXT',
    label: 'Plain text',
    description: 'TXT in various encodings',
  },
  ARCHIVED_DATA: {
    id: 'ARCHIVED_DATA',
    label: 'Archived data',
    description: 'ZIP, RAR, JAR, etc.',
  },
  SOFTWARE_APPLICATIONS: {
    id: 'SOFTWARE_APPLICATIONS',
    label: 'Software applications',
    description: 'modelling tools, editors, IDE, compilers, etc.',
  },
  SOURCE_CODE: {
    id: 'SOURCE_CODE',
    label: 'Source code',
    description: 'scripting, Java, C, C++, Fortran, etc.',
  },
  CONFIGURATION_DATA: {
    id: 'CONFIGURATION_DATA',
    label: 'Configuration data',
    description: 'parameter settings, logs, library files',
  },
  OTHER: { id: 'OTHER', label: 'Other', description: '' },
};

export const FILE_SIZES = [
  { label: '< 100 MB', size: 99999999 },
  { label: '100 - 1000 MB', size: 999999999 },
  { label: '1 - 5 GB', size: 4999999999 },
  { label: '5 - 20 GB', size: 19999999999 },
  { label: '20 - 50 GB', size: 49999999999 },
  { label: '50 - 100 GB', size: 99999999999 },
  { label: '100 - 500 GB', size: 499999999999 },
  { label: '500 - 1000 GB', size: 999999999999 },
  { label: '1 - 5 TB', size: 4999999999999 },
  { label: '5 - 10 TB', size: 9999999999999 },
  { label: '10 - 100 TB', size: 99999999999999 },
  { label: '100 - 500 TB', size: 499999999999999 },
  { label: '500 - 1000 TB', size: 999999999999999 },
  { label: '> 1 PB', size: 1500000000000000 },
  { label: "I don't know yet", size: -1 },
];
