import { FILE_TYPES } from '../specify-data/data-specs';
import { TreeData } from '../../../widgets/tree-select-form-field/tree-select-form-field.component';

export const REPO_FILTERS: { [key: string]: TreeData[] } = {
  dataAccessTypes: [
    {
      id: 'open',
      label: 'open',
    },
    {
      id: 'embargoed',
      label: 'embargoed',
    },
    {
      id: 'restricted',
      label: 'restricted',
    },
    {
      id: 'closed',
      label: 'closed',
    },
  ],
  accessTypes: [
    {
      id: 'open',
      label: 'open',
    },
    {
      id: 'restricted',
      label: 'restricted',
    },
    {
      id: 'closed',
      label: 'closed',
    },
  ],
  dataLicenses: [
    {
      id: 'Apache License 2.0',
      label: 'Apache License 2.0',
    },
    {
      id: 'BSD',
      label: 'BSD',
    },
    {
      id: 'CC',
      label: 'CC',
    },
    {
      id: 'CC0',
      label: 'CC0',
    },
    {
      id: 'Copyrights',
      label: 'Copyrights',
    },
    {
      id: 'ODC',
      label: 'ODC',
    },
    {
      id: 'OGL',
      label: 'OGL',
    },
    {
      id: 'OGLC',
      label: 'OGLC',
    },
    {
      id: 'Public Domain',
      label: 'Public Domain',
    },
    {
      id: 'RL',
      label: 'RL',
    },
    {
      id: 'other',
      label: 'other',
    },
    {
      id: 'none',
      label: 'none',
    },
  ],
  versioning: [
    {
      id: 'no',
      label: 'no',
    },
    {
      id: 'yes',
      label: 'yes',
    },
  ],
  repositoryTypes: [
    {
      id: 'disciplinary',
      label: 'disciplinary',
    },
    {
      id: 'institutional',
      label: 'institutional',
    },
    {
      id: 'other',
      label: 'other',
    },
  ],
  institutionTypes: [
    {
      id: 'commercial',
      label: 'commercial',
    },
    {
      id: 'non-profit',
      label: 'non-profit',
    },
  ],
  contentTypes: [
    {
      id: FILE_TYPES.STANDARD_OFFICE_DOCUMENTS.label,
      label: FILE_TYPES.STANDARD_OFFICE_DOCUMENTS.label,
    },
    {
      id: FILE_TYPES.STRUCTURED_TEXT.label,
      label: FILE_TYPES.STRUCTURED_TEXT.label,
    },
    {
      id: FILE_TYPES.IMAGES.label,
      label: FILE_TYPES.IMAGES.label,
    },
    {
      id: FILE_TYPES.AUDIOVISUAL_DATA.label,
      label: FILE_TYPES.AUDIOVISUAL_DATA.label,
    },
    {
      id: FILE_TYPES.RAW_DATA.label,
      label: FILE_TYPES.RAW_DATA.label,
    },
    {
      id: FILE_TYPES.NETWORKBASED_DATA.label,
      label: FILE_TYPES.NETWORKBASED_DATA.label,
    },
    {
      id: FILE_TYPES.DATABASES.label,
      label: FILE_TYPES.DATABASES.label,
    },
    {
      id: FILE_TYPES.STRUCTURED_GRAPHICS.label,
      label: FILE_TYPES.STRUCTURED_GRAPHICS.label,
    },
    {
      id: FILE_TYPES.SCIENTIFIC_STATISTICAL_DATA.label,
      label: FILE_TYPES.SCIENTIFIC_STATISTICAL_DATA.label,
    },
    {
      id: FILE_TYPES.PLAIN_TEXT.label,
      label: FILE_TYPES.PLAIN_TEXT.label,
    },
    {
      id: FILE_TYPES.ARCHIVED_DATA.label,
      label: FILE_TYPES.ARCHIVED_DATA.label,
    },
    {
      id: FILE_TYPES.SOFTWARE_APPLICATIONS.label,
      label: FILE_TYPES.SOFTWARE_APPLICATIONS.label,
    },
    {
      id: FILE_TYPES.SOURCE_CODE.label,
      label: FILE_TYPES.SOURCE_CODE.label,
    },
    {
      id: FILE_TYPES.CONFIGURATION_DATA.label,
      label: FILE_TYPES.CONFIGURATION_DATA.label,
    },
    {
      id: FILE_TYPES.OTHER.label,
      label: FILE_TYPES.OTHER.label,
    },
  ],
  certificates: [
    {
      id: 'CLARIN certificate B',
      label: 'CLARIN certificate B',
    },
    {
      id: 'CoreTrustSeal',
      label: 'CoreTrustSeal',
    },
    {
      id: 'DIN 31644',
      label: 'DIN 31644',
    },
    {
      id: 'DINI Certificate',
      label: 'DINI Certificate',
    },
    {
      id: 'DRAMBORA',
      label: 'DRAMBORA',
    },
    {
      id: 'DSA',
      label: 'DSA',
    },
    {
      id: 'ISO 16363',
      label: 'ISO 16363',
    },
    {
      id: 'ISO 16919',
      label: 'ISO 16919',
    },
    {
      id: 'RatSWD',
      label: 'RatSWD',
    },
    {
      id: 'TRAC',
      label: 'TRAC',
    },
    {
      id: 'Trusted Digital Repository',
      label: 'Trusted Digital Repository',
    },
    {
      id: 'WDS',
      label: 'WDS',
    },
    {
      id: 'other',
      label: 'other',
    },
  ],
  pidSystems: [
    {
      id: 'ARK',
      label: 'ARK',
    },
    {
      id: 'DOI',
      label: 'DOI',
    },
    {
      id: 'hdl',
      label: 'hdl',
    },
    {
      id: 'PURL',
      label: 'PURL',
    },
    {
      id: 'URN',
      label: 'URN',
    },
    {
      id: 'other',
      label: 'other',
    },
    {
      id: 'none',
      label: 'none',
    },
  ],
  aidSystems: [
    {
      id: 'AuthorClaim',
      label: 'AuthorClaim',
    },
    {
      id: 'ISNI',
      label: 'ISNI',
    },
    {
      id: 'ORCID',
      label: 'ORCID',
    },
    {
      id: 'ResearcherID',
      label: 'ResearcherID',
    },
    {
      id: 'other',
      label: 'other',
    },
    {
      id: 'none',
      label: 'none',
    },
  ],
  countries: [
    {
      id: 'ABW',
      label: 'Aruba',
    },
    {
      id: 'AFG',
      label: 'Afghanistan',
    },
    {
      id: 'AGO',
      label: 'Angola',
    },
    {
      id: 'AIA',
      label: 'Anguilla',
    },
    {
      id: 'ALA',
      label: 'Aland Islands',
    },
    {
      id: 'AND',
      label: 'Andorra',
    },
    {
      id: 'ARE',
      label: 'United Arab Emirates',
    },
    {
      id: 'ARG',
      label: 'Argentina',
    },
    {
      id: 'ASM',
      label: 'American Samoa',
    },
    {
      id: 'ATA',
      label: 'Antarctica',
    },
    {
      id: 'ATF',
      label: 'French Southern Territories',
    },
    {
      id: 'ATG',
      label: 'Antigua and Barbuda',
    },
    {
      id: 'AUS',
      label: 'Australia',
    },
    {
      id: 'AUT',
      label: 'Austria',
    },
    {
      id: 'AZE',
      label: 'Azerbaijan',
    },
    {
      id: 'BDI',
      label: 'Burundi',
    },
    {
      id: 'BEL',
      label: 'Belgium',
    },
    {
      id: 'BEN',
      label: 'Benin',
    },
    {
      id: 'BES',
      label: 'Bonaire, Sint Eustatius and Saba',
    },
    {
      id: 'BFA',
      label: 'Burkina Faso',
    },
    {
      id: 'BGD',
      label: 'Bangladesh',
    },
    {
      id: 'BGR',
      label: 'Bulgaria',
    },
    {
      id: 'BHR',
      label: 'Bahrain',
    },
    {
      id: 'BHS',
      label: 'Bahamas',
    },
    {
      id: 'BIH',
      label: 'Bosnia and Herzegovina',
    },
    {
      id: 'BLM',
      label: 'Saint Barthelemy',
    },
    {
      id: 'BLR',
      label: 'Belarus',
    },
    {
      id: 'BMU',
      label: 'Bermuda',
    },
    {
      id: 'BOL',
      label: 'Bolivia, Plurinational State of',
    },
    {
      id: 'BRA',
      label: 'Brazil',
    },
    {
      id: 'BRB',
      label: 'Barbados',
    },
    {
      id: 'BRN',
      label: 'Brunei Darussalam',
    },
    {
      id: 'BTN',
      label: 'Bhutan',
    },
    {
      id: 'BVT',
      label: 'Bouvet Island',
    },
    {
      id: 'BWA',
      label: 'Botswana',
    },
    {
      id: 'CAF',
      label: 'Central African Republic',
    },
    {
      id: 'CAN',
      label: 'Canada',
    },
    {
      id: 'CCK',
      label: 'Cocos (Keeling) Islands',
    },
    {
      id: 'CHE',
      label: 'Switzerland',
    },
    {
      id: 'CHL',
      label: 'Chile',
    },
    {
      id: 'CHN',
      label: 'China',
    },
    {
      id: 'CIV',
      label: "Cote d'Ivoire",
    },
    {
      id: 'CMR',
      label: 'Cameroon',
    },
    {
      id: 'COD',
      label: 'Congo, the Democratic Republic of the',
    },
    {
      id: 'COG',
      label: 'Congo',
    },
    {
      id: 'COK',
      label: 'Cook Islands',
    },
    {
      id: 'COL',
      label: 'Colombia',
    },
    {
      id: 'COM',
      label: 'Comoros',
    },
    {
      id: 'CPV',
      label: 'Cape Verde',
    },
    {
      id: 'CRI',
      label: 'Costa Rica',
    },
    {
      id: 'CUB',
      label: 'Cuba',
    },
    {
      id: 'CUW',
      label: 'Curacao',
    },
    {
      id: 'CXR',
      label: 'Christmas Island',
    },
    {
      id: 'CYM',
      label: 'Cayman Islands',
    },
    {
      id: 'CZE',
      label: 'Czech Republic',
    },
    {
      id: 'DEU',
      label: 'Germany',
    },
    {
      id: 'DJI',
      label: 'Djibouti',
    },
    {
      id: 'DMA',
      label: 'Dominica',
    },
    {
      id: 'DNK',
      label: 'Denmark',
    },
    {
      id: 'DOM',
      label: 'Dominican Republic',
    },
    {
      id: 'DZA',
      label: 'Algeria',
    },
    {
      id: 'ECU',
      label: 'Ecuador',
    },
    {
      id: 'EGY',
      label: 'Egypt',
    },
    {
      id: 'ERI',
      label: 'Eritrea',
    },
    {
      id: 'ESH',
      label: 'Western Sahara',
    },
    {
      id: 'ESP',
      label: 'Spain',
    },
    {
      id: 'EST',
      label: 'Estonia',
    },
    {
      id: 'ETH',
      label: 'Ethiopia',
    },
    {
      id: 'FIN',
      label: 'Finland',
    },
    {
      id: 'FJI',
      label: 'Fiji',
    },
    {
      id: 'FLK',
      label: 'Falkland Islands (Malvinas)',
    },
    {
      id: 'FRA',
      label: 'France',
    },
    {
      id: 'FRO',
      label: 'Faroe Islands',
    },
    {
      id: 'FSM',
      label: 'Micronesia, Federated States of',
    },
    {
      id: 'GAB',
      label: 'Gabon',
    },
    {
      id: 'GBR',
      label: 'United Kingdom',
    },
    {
      id: 'GEO',
      label: 'Georgia',
    },
    {
      id: 'GGY',
      label: 'Guernsey',
    },
    {
      id: 'GHA',
      label: 'Ghana',
    },
    {
      id: 'GIB',
      label: 'Gibraltar',
    },
    {
      id: 'GIN',
      label: 'Guinea',
    },
    {
      id: 'GLP',
      label: 'Guadeloupe',
    },
    {
      id: 'GMB',
      label: 'Gambia',
    },
    {
      id: 'GNB',
      label: 'Guinea-Bissau',
    },
    {
      id: 'GNQ',
      label: 'Equatorial Guinea',
    },
    {
      id: 'GRC',
      label: 'Greece',
    },
    {
      id: 'GRD',
      label: 'Grenada',
    },
    {
      id: 'GRL',
      label: 'Greenland',
    },
    {
      id: 'GTM',
      label: 'Guatemala',
    },
    {
      id: 'GUF',
      label: 'French Guiana',
    },
    {
      id: 'GUM',
      label: 'Guam',
    },
    {
      id: 'GUY',
      label: 'Guyana',
    },
    {
      id: 'HKG',
      label: 'Hong Kong',
    },
    {
      id: 'HMD',
      label: 'Heard Island and McDonald Islands',
    },
    {
      id: 'HND',
      label: 'Honduras',
    },
    {
      id: 'HRV',
      label: 'Croatia',
    },
    {
      id: 'HTI',
      label: 'Haiti',
    },
    {
      id: 'HUN',
      label: 'Hungary',
    },
    {
      id: 'IDN',
      label: 'Indonesia',
    },
    {
      id: 'IMN',
      label: 'Isle of Man',
    },
    {
      id: 'IND',
      label: 'India',
    },
    {
      id: 'IOT',
      label: 'British Indian Ocean Territory',
    },
    {
      id: 'IRL',
      label: 'Ireland',
    },
    {
      id: 'IRN',
      label: 'Iran, Islamic Republic of',
    },
    {
      id: 'IRQ',
      label: 'Iraq',
    },
    {
      id: 'ISL',
      label: 'Iceland',
    },
    {
      id: 'ISR',
      label: 'Israel',
    },
    {
      id: 'ITA',
      label: 'Italy',
    },
    {
      id: 'JAM',
      label: 'Jamaica',
    },
    {
      id: 'JEY',
      label: 'Jersey',
    },
    {
      id: 'JOR',
      label: 'Jordan',
    },
    {
      id: 'JPN',
      label: 'Japan',
    },
    {
      id: 'KAZ',
      label: 'Kazakhstan',
    },
    {
      id: 'KEN',
      label: 'Kenya',
    },
    {
      id: 'KGZ',
      label: 'Kyrgyzstan',
    },
    {
      id: 'KHM',
      label: 'Cambodia',
    },
    {
      id: 'KIR',
      label: 'Kiribati',
    },
    {
      id: 'KNA',
      label: 'Saint Kitts and Nevis',
    },
    {
      id: 'KOR',
      label: 'Korea, Republic of',
    },
    {
      id: 'KWT',
      label: 'Kuwait',
    },
    {
      id: 'LAO',
      label: "Lao People's Democratic Republic",
    },
    {
      id: 'LBN',
      label: 'Lebanon',
    },
    {
      id: 'LBR',
      label: 'Liberia',
    },
    {
      id: 'LBY',
      label: 'Libya',
    },
    {
      id: 'LCA',
      label: 'Saint Lucia',
    },
    {
      id: 'LIE',
      label: 'Liechtenstein',
    },
    {
      id: 'LKA',
      label: 'Sri Lanka',
    },
    {
      id: 'LSO',
      label: 'Lesotho',
    },
    {
      id: 'LTU',
      label: 'Lithuania',
    },
    {
      id: 'LUX',
      label: 'Luxembourg',
    },
    {
      id: 'LVA',
      label: 'Latvia',
    },
    {
      id: 'MAC',
      label: 'Macao',
    },
    {
      id: 'MAF',
      label: 'Saint Martin (French part)',
    },
    {
      id: 'MAR',
      label: 'Morocco',
    },
    {
      id: 'MCO',
      label: 'Monaco',
    },
    {
      id: 'MDA',
      label: 'Moldova, Republic of',
    },
    {
      id: 'MDG',
      label: 'Madagascar',
    },
    {
      id: 'MDV',
      label: 'Maldives',
    },
    {
      id: 'MEX',
      label: 'Mexico',
    },
    {
      id: 'MHL',
      label: 'Marshall Islands',
    },
    {
      id: 'MKD',
      label: 'Macedonia, the former Yugoslav Republic of',
    },
    {
      id: 'MLI',
      label: 'Mali',
    },
    {
      id: 'MLT',
      label: 'Malta',
    },
    {
      id: 'MMR',
      label: 'Myanmar',
    },
    {
      id: 'MNE',
      label: 'Montenegro',
    },
    {
      id: 'MNG',
      label: 'Mongolia',
    },
    {
      id: 'MNP',
      label: 'Northern Mariana Islands',
    },
    {
      id: 'MOZ',
      label: 'Mozambique',
    },
    {
      id: 'MRT',
      label: 'Mauritania',
    },
    {
      id: 'MSR',
      label: 'Montserrat',
    },
    {
      id: 'MTQ',
      label: 'Martinique',
    },
    {
      id: 'MUS',
      label: 'Mauritius',
    },
    {
      id: 'MWI',
      label: 'Malawi',
    },
    {
      id: 'MYS',
      label: 'Malaysia',
    },
    {
      id: 'MYT',
      label: 'Mayotte',
    },
    {
      id: 'NAM',
      label: 'Namibia',
    },
    {
      id: 'NCL',
      label: 'New Caledonia',
    },
    {
      id: 'NER',
      label: 'Niger',
    },
    {
      id: 'NFK',
      label: 'Norfolk Island',
    },
    {
      id: 'NGA',
      label: 'Nigeria',
    },
    {
      id: 'NIC',
      label: 'Nicaragua',
    },
    {
      id: 'NIU',
      label: 'Niue',
    },
    {
      id: 'NLD',
      label: 'Netherlands',
    },
    {
      id: 'NOR',
      label: 'Norway',
    },
    {
      id: 'NPL',
      label: 'Nepal',
    },
    {
      id: 'NRU',
      label: 'Nauru',
    },
    {
      id: 'NZL',
      label: 'New Zealand',
    },
    {
      id: 'OMN',
      label: 'Oman',
    },
    {
      id: 'PAK',
      label: 'Pakistan',
    },
    {
      id: 'PAN',
      label: 'Panama',
    },
    {
      id: 'PCN',
      label: 'Pitcairn',
    },
    {
      id: 'PER',
      label: 'Peru',
    },
    {
      id: 'PHL',
      label: 'Philippines',
    },
    {
      id: 'PLW',
      label: 'Palau',
    },
    {
      id: 'PNG',
      label: 'Papua New Guinea',
    },
    {
      id: 'POL',
      label: 'Poland',
    },
    {
      id: 'PRI',
      label: 'Puerto Rico',
    },
    {
      id: 'PRK',
      label: "Korea, Democratic People's Republic of",
    },
    {
      id: 'PRT',
      label: 'Portugal',
    },
    {
      id: 'PRY',
      label: 'Paraguay',
    },
    {
      id: 'PSE',
      label: 'Palestinian Territory, Occupied',
    },
    {
      id: 'PYF',
      label: 'French Polynesia',
    },
    {
      id: 'QAT',
      label: 'Qatar',
    },
    {
      id: 'REU',
      label: 'Reunion',
    },
    {
      id: 'ROU',
      label: 'Romania',
    },
    {
      id: 'RUS',
      label: 'Russian Federation',
    },
    {
      id: 'RWA',
      label: 'Rwanda',
    },
    {
      id: 'SAU',
      label: 'Saudi Arabia',
    },
    {
      id: 'SDN',
      label: 'Sudan',
    },
    {
      id: 'SEN',
      label: 'Senegal',
    },
    {
      id: 'SGP',
      label: 'Singapore',
    },
    {
      id: 'SGS',
      label: 'South Georgia and the South Sandwich Islands',
    },
    {
      id: 'SHN',
      label: 'Saint Helena, Ascension and Tristan da Cunha',
    },
    {
      id: 'SJM',
      label: 'Svalbard and Jan Mayen',
    },
    {
      id: 'SLB',
      label: 'Solomon Islands',
    },
    {
      id: 'SLE',
      label: 'Sierra Leone',
    },
    {
      id: 'SLV',
      label: 'El Salvador',
    },
    {
      id: 'SMR',
      label: 'San Marino',
    },
    {
      id: 'SOM',
      label: 'Somalia',
    },
    {
      id: 'SPM',
      label: 'Saint Pierre and Miquelon',
    },
    {
      id: 'SRB',
      label: 'Serbia',
    },
    {
      id: 'SSD',
      label: 'South Sudan',
    },
    {
      id: 'STP',
      label: 'Sao Tome and Principe',
    },
    {
      id: 'SUR',
      label: 'Suriname',
    },
    {
      id: 'SVK',
      label: 'Slovakia',
    },
    {
      id: 'SVN',
      label: 'Slovenia',
    },
    {
      id: 'SWE',
      label: 'Sweden',
    },
    {
      id: 'SWZ',
      label: 'Swaziland',
    },
    {
      id: 'SXM',
      label: 'Sint Maarten (Dutch part)',
    },
    {
      id: 'SYC',
      label: 'Seychelles',
    },
    {
      id: 'SYR',
      label: 'Syrian Arab Republic',
    },
    {
      id: 'TCA',
      label: 'Turks and Caicos Islands',
    },
    {
      id: 'TCD',
      label: 'Chad',
    },
    {
      id: 'TGO',
      label: 'Togo',
    },
    {
      id: 'THA',
      label: 'Thailand',
    },
    {
      id: 'TJK',
      label: 'Tajikistan',
    },
    {
      id: 'TKL',
      label: 'Tokelau',
    },
    {
      id: 'TKM',
      label: 'Turkmenistan',
    },
    {
      id: 'TLS',
      label: 'Timor-Leste',
    },
    {
      id: 'TON',
      label: 'Tonga',
    },
    {
      id: 'TTO',
      label: 'Trinidad and Tobago',
    },
    {
      id: 'TUN',
      label: 'Tunisia',
    },
    {
      id: 'TUR',
      label: 'Turkey',
    },
    {
      id: 'TUV',
      label: 'Tuvalu',
    },
    {
      id: 'TWN',
      label: 'Taiwan, Province of China',
    },
    {
      id: 'TZA',
      label: 'Tanzania, United Republic of',
    },
    {
      id: 'UGA',
      label: 'Uganda',
    },
    {
      id: 'UKR',
      label: 'Ukraine',
    },
    {
      id: 'UMI',
      label: 'United States Minor Outlying Islands',
    },
    {
      id: 'URY',
      label: 'Uruguay',
    },
    {
      id: 'USA',
      label: 'United States',
    },
    {
      id: 'UZB',
      label: 'Uzbekistan',
    },
    {
      id: 'VAT',
      label: 'Holy See (Vatican City State)',
    },
    {
      id: 'VCT',
      label: 'Saint Vincent and the Grenadines',
    },
    {
      id: 'VEN',
      label: 'Venezuela, Bolivarian Republic of',
    },
    {
      id: 'VGB',
      label: 'Virgin Islands, British',
    },
    {
      id: 'VIR',
      label: 'Virgin Islands, U.S.',
    },
    {
      id: 'VNM',
      label: 'Vietnam',
    },
    {
      id: 'VUT',
      label: 'Vanuatu',
    },
    {
      id: 'WLF',
      label: 'Wallis and Futuna',
    },
    {
      id: 'WSM',
      label: 'Samoa',
    },
    {
      id: 'YEM',
      label: 'Yemen',
    },
    {
      id: 'ZAF',
      label: 'South Africa',
    },
    {
      id: 'ZMB',
      label: 'Zambia',
    },
    {
      id: 'ZWE',
      label: 'Zimbabwe',
    },
    {
      id: 'EEC',
      label: 'European Union',
    },
    {
      id: 'AAA',
      label: 'International',
    },
  ],
  subjects: [
    {
      id: '1 Humanities and Social Sciences',
      label: 'Humanities and Social Sciences',
      children: [
        {
          id: '11 Humanities',
          label: 'Humanities',
          children: [
            {
              id: '101 Ancient Cultures',
              label: 'Ancient Cultures',
              children: [
                {
                  id: '10101 Prehistory',
                  label: 'Prehistory',
                },
                {
                  id: '10102 Classical Philology',
                  label: 'Classical Philology',
                },
                {
                  id: '10103 Ancient History',
                  label: 'Ancient History',
                },
                {
                  id: '10104 Classical Archaeology',
                  label: 'Classical Archaeology',
                },
                {
                  id: '10105 Egyptology and Ancient Near Eastern Studies',
                  label: 'Egyptology and Ancient Near Eastern Studies',
                },
              ],
            },
            {
              id: '102 History',
              label: 'History',
              children: [
                {
                  id: '10201 Medieval History',
                  label: 'Medieval History',
                },
                {
                  id: '10202 Early Modern History',
                  label: 'Early Modern History',
                },
                {
                  id: '10203 Modern and Current History',
                  label: 'Modern and Current History',
                },
                {
                  id: '10204 History of Science',
                  label: 'History of Science',
                },
              ],
            },
            {
              id: '103 Fine Arts, Music, Theatre and Media Studies',
              label: 'Fine Arts, Music, Theatre and Media Studies',
              children: [
                {
                  id: '10301 Art History',
                  label: 'Art History',
                },
                {
                  id: '10302 Musicology',
                  label: 'Musicology',
                },
                {
                  id: '10303 Theatre and Media Studies',
                  label: 'Theatre and Media Studies',
                },
              ],
            },
            {
              id: '104 Linguistics',
              label: 'Linguistics',
              children: [
                {
                  id: '10401 General and Applied Linguistics',
                  label: 'General and Applied Linguistics',
                },
                {
                  id: '10402 Individual Linguistics',
                  label: 'Individual Linguistics',
                },
                {
                  id: '10403 Typology, Non-European Languages, Historical Linguistics',
                  label:
                    'Typology, Non-European Languages, Historical Linguistics',
                },
              ],
            },
            {
              id: '105 Literary Studies',
              label: 'Literary Studies',
              children: [
                {
                  id: '10501 Medieval German Literature',
                  label: 'Medieval German Literature',
                },
                {
                  id: '10502 Modern German Literature',
                  label: 'Modern German Literature',
                },
                {
                  id: '10503 European and American Literature',
                  label: 'European and American Literature',
                },
                {
                  id: '10504 General and Comparative Literature and Cultural Studies',
                  label:
                    'General and Comparative Literature and Cultural Studies',
                },
              ],
            },
            {
              id: '106 Non-European Languages and Cultures, Social and Cultural Anthropology, Jewish Studies and Religious Studies',
              label:
                'Non-European Languages and Cultures, Social and Cultural Anthropology, Jewish Studies and Religious Studies',
              children: [
                {
                  id: '10601 Social and Cultural Anthropology and Ethnology/Folklore',
                  label:
                    'Social and Cultural Anthropology and Ethnology/Folklore',
                },
                {
                  id: '10602 Asian Studies',
                  label: 'Asian Studies',
                },
                {
                  id: '10603 African, American and Oceania Studies',
                  label: 'African, American and Oceania Studies',
                },
                {
                  id: '10604 Islamic Studies, Arabian Studies, Semitic Studies',
                  label: 'Islamic Studies, Arabian Studies, Semitic Studies',
                },
                {
                  id: '10605 Religious Studies and Jewish Studies',
                  label: 'Religious Studies and Jewish Studies',
                },
              ],
            },
            {
              id: '107 Theology',
              label: 'Theology',
              children: [
                {
                  id: '10701 Protestant Theology',
                  label: 'Protestant Theology',
                },
                {
                  id: '10702 Roman Catholic Theology',
                  label: 'Roman Catholic Theology',
                },
              ],
            },
            {
              id: '108 Philosophy',
              label: 'Philosophy',
              children: [
                {
                  id: '10801 History of Philosophy',
                  label: 'History of Philosophy',
                },
                {
                  id: '10802 Theoretical Philosophy',
                  label: 'Theoretical Philosophy',
                },
                {
                  id: '10803 Practical Philosophy',
                  label: 'Practical Philosophy',
                },
              ],
            },
          ],
        },
        {
          id: '12 Social and Behavioural Sciences',
          label: 'Social and Behavioural Sciences',
          children: [
            {
              id: '109 Education Sciences',
              label: 'Education Sciences',
              children: [
                {
                  id: '10901 General Education and History of Education',
                  label: 'General Education and History of Education',
                },
                {
                  id: '10902 Research on Teaching, Learning and Training',
                  label: 'Research on Teaching, Learning and Training',
                },
                {
                  id: '10903 Research on Socialization and Educational Institutions and Professions',
                  label:
                    'Research on Socialization and Educational Institutions and Professions',
                },
              ],
            },
            {
              id: '110 Psychology',
              label: 'Psychology',
              children: [
                {
                  id: '11001 General, Biological and Mathematical Psychology',
                  label: 'General, Biological and Mathematical Psychology',
                },
                {
                  id: '11002 Developmental and Educational Psychology',
                  label: 'Developmental and Educational Psychology',
                },
                {
                  id: '11003 Social Psychology, Industrial and Organisational Psychology',
                  label:
                    'Social Psychology, Industrial and Organisational Psychology',
                },
                {
                  id: '11004 Differential Psychology, Clinical Psychology, Medical Psychology, Methodology',
                  label:
                    'Differential Psychology, Clinical Psychology, Medical Psychology, Methodology',
                },
              ],
            },
            {
              id: '111 Social Sciences',
              label: 'Social Sciences',
              children: [
                {
                  id: '11101 Sociological Theory',
                  label: 'Sociological Theory',
                },
                {
                  id: '11102 Empirical Social Research',
                  label: 'Empirical Social Research',
                },
                {
                  id: '11103 Communication Science',
                  label: 'Communication Science',
                },
                {
                  id: '11104 Political Science',
                  label: 'Political Science',
                },
              ],
            },
            {
              id: '112 Economics',
              label: 'Economics',
              children: [
                {
                  id: '11201 Economic Theory',
                  label: 'Economic Theory',
                },
                {
                  id: '11202 Economic and Social Policy',
                  label: 'Economic and Social Policy',
                },
                {
                  id: '11203 Public Finance',
                  label: 'Public Finance',
                },
                {
                  id: '11204 Business Administration',
                  label: 'Business Administration',
                },
                {
                  id: '11205 Statistics and Econometrics',
                  label: 'Statistics and Econometrics',
                },
                {
                  id: '11206 Economic and Social History',
                  label: 'Economic and Social History',
                },
              ],
            },
            {
              id: '113 Jurisprudence',
              label: 'Jurisprudence',
              children: [
                {
                  id: '11301 Legal and Political Philosophy, Legal History, Legal Theory',
                  label:
                    'Legal and Political Philosophy, Legal History, Legal Theory',
                },
                {
                  id: '11302 Private Law',
                  label: 'Private Law',
                },
                {
                  id: '11303 Public Law',
                  label: 'Public Law',
                },
                {
                  id: '11304 Criminal Law and Law of Criminal Procedure',
                  label: 'Criminal Law and Law of Criminal Procedure',
                },
                {
                  id: '11305 Criminology',
                  label: 'Criminology',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '2 Life Sciences',
      label: 'Life Sciences',
      children: [
        {
          id: '21 Biology',
          label: 'Biology',
          children: [
            {
              id: '201 Basic Biological and Medical Research',
              label: 'Basic Biological and Medical Research',
              children: [
                {
                  id: '20101 Biochemistry',
                  label: 'Biochemistry',
                },
                {
                  id: '20102 Biophysics',
                  label: 'Biophysics',
                },
                {
                  id: '20103 Cell Biology',
                  label: 'Cell Biology',
                },
                {
                  id: '20104 Structural Biology',
                  label: 'Structural Biology',
                },
                {
                  id: '20105 General Genetics',
                  label: 'General Genetics',
                },
                {
                  id: '20106 Developmental Biology',
                  label: 'Developmental Biology',
                },
                {
                  id: '20107 Bioinformatics and Theoretical Biology',
                  label: 'Bioinformatics and Theoretical Biology',
                },
                {
                  id: '20108 Anatomy',
                  label: 'Anatomy',
                },
              ],
            },
            {
              id: '202 Plant Sciences',
              label: 'Plant Sciences',
              children: [
                {
                  id: '20201 Plant Systematics and Evolution',
                  label: 'Plant Systematics and Evolution',
                },
                {
                  id: '20202 Plant Ecology and Ecosystem Analysis',
                  label: 'Plant Ecology and Ecosystem Analysis',
                },
                {
                  id: '20203 Inter-organismic Interactions of Plants',
                  label: 'Inter-organismic Interactions of Plants',
                },
                {
                  id: '20204 Plant Physiology',
                  label: 'Plant Physiology',
                },
                {
                  id: '20205 Plant Biochemistry and Biophysics',
                  label: 'Plant Biochemistry and Biophysics',
                },
                {
                  id: '20206 Plant Cell and Developmental Biology',
                  label: 'Plant Cell and Developmental Biology',
                },
                {
                  id: '20207 Plant Genetics',
                  label: 'Plant Genetics',
                },
              ],
            },
            {
              id: '203 Zoology',
              label: 'Zoology',
              children: [
                {
                  id: '20301 Systematics and Morphology',
                  label: 'Systematics and Morphology',
                },
                {
                  id: '20302 Evolution, Anthropology',
                  label: 'Evolution, Anthropology',
                },
                {
                  id: '20303 Animal Ecology, Biodiversity and Ecosystem Research',
                  label: 'Animal Ecology, Biodiversity and Ecosystem Research',
                },
                {
                  id: '20304 Sensory and Behavioural Biology',
                  label: 'Sensory and Behavioural Biology',
                },
                {
                  id: '20305 Biochemistry and Animal Physiology',
                  label: 'Biochemistry and Animal Physiology',
                },
                {
                  id: '20306 Animal Genetics, Cell and Developmental Biology',
                  label: 'Animal Genetics, Cell and Developmental Biology',
                },
              ],
            },
          ],
        },
        {
          id: '22 Medicine',
          label: 'Medicine',
          children: [
            {
              id: '204 Microbiology, Virology and Immunology',
              label: 'Microbiology, Virology and Immunology',
              children: [
                {
                  id: '20401 Metabolism, Biochemistry and Genetics of Microorganisms',
                  label:
                    'Metabolism, Biochemistry and Genetics of Microorganisms',
                },
                {
                  id: '20402 Microbial Ecology and Applied Microbiology',
                  label: 'Microbial Ecology and Applied Microbiology',
                },
                {
                  id: '20403 Medical Microbiology, Molecular Infection Biology',
                  label: 'Medical Microbiology, Molecular Infection Biology',
                },
                {
                  id: '20404 Virology',
                  label: 'Virology',
                },
                {
                  id: '20405 Immunology',
                  label: 'Immunology',
                },
              ],
            },
            {
              id: '205 Medicine',
              label: 'Medicine',
              children: [
                {
                  id: '20501 Epidemiology, Medical Biometry, Medical Informatics',
                  label: 'Epidemiology, Medical Biometry, Medical Informatics',
                },
                {
                  id: '20502 Public Health, Health Services Research, Social Medicine',
                  label:
                    'Public Health, Health Services Research, Social Medicine',
                },
                {
                  id: '20503 Human Genetics',
                  label: 'Human Genetics',
                },
                {
                  id: '20504 Physiology',
                  label: 'Physiology',
                },
                {
                  id: '20505 Nutritional Sciences',
                  label: 'Nutritional Sciences',
                },
                {
                  id: '20506 Pathology and Forensic Medicine',
                  label: 'Pathology and Forensic Medicine',
                },
                {
                  id: '20507 Clinical Chemistry and Pathobiochemistry',
                  label: 'Clinical Chemistry and Pathobiochemistry',
                },
                {
                  id: '20508 Pharmacy',
                  label: 'Pharmacy',
                },
                {
                  id: '20509 Pharmacology',
                  label: 'Pharmacology',
                },
                {
                  id: '20510 Toxicology and Occupational Medicine',
                  label: 'Toxicology and Occupational Medicine',
                },
                {
                  id: '20511 Anaesthesiology',
                  label: 'Anaesthesiology',
                },
                {
                  id: '20512 Cardiology, Angiology',
                  label: 'Cardiology, Angiology',
                },
                {
                  id: '20513 Pneumology, Clinical Infectiology Intensive Care Medicine',
                  label:
                    'Pneumology, Clinical Infectiology Intensive Care Medicine',
                },
                {
                  id: '20514 Hematology, Oncology, Transfusion Medicine',
                  label: 'Hematology, Oncology, Transfusion Medicine',
                },
                {
                  id: '20515 Gastroenterology, Metabolism',
                  label: 'Gastroenterology, Metabolism',
                },
                {
                  id: '20516 Nephrology',
                  label: 'Nephrology',
                },
                {
                  id: '20517 Endocrinology, Diabetology',
                  label: 'Endocrinology, Diabetology',
                },
                {
                  id: '20518 Rheumatology, Clinical Immunology, Allergology',
                  label: 'Rheumatology, Clinical Immunology, Allergology',
                },
                {
                  id: '20519 Dermatology',
                  label: 'Dermatology',
                },
                {
                  id: '20520 Pediatric and Adolescent Medicine',
                  label: 'Pediatric and Adolescent Medicine',
                },
                {
                  id: '20521 Gynaecology and Obstetrics',
                  label: 'Gynaecology and Obstetrics',
                },
                {
                  id: '20522 Reproductive Medicine/Biology',
                  label: 'Reproductive Medicine/Biology',
                },
                {
                  id: '20523 Urology',
                  label: 'Urology',
                },
                {
                  id: '20524 Gerontology and Geriatric Medicine',
                  label: 'Gerontology and Geriatric Medicine',
                },
                {
                  id: '20525 Vascular and Visceral Surgery',
                  label: 'Vascular and Visceral Surgery',
                },
                {
                  id: '20526 Cardiothoracic Surgery',
                  label: 'Cardiothoracic Surgery',
                },
                {
                  id: '20527 Traumatology and Orthopaedics',
                  label: 'Traumatology and Orthopaedics',
                },
                {
                  id: '20528 Dentistry, Oral Surgery',
                  label: 'Dentistry, Oral Surgery',
                },
                {
                  id: '20529 Otolaryngology',
                  label: 'Otolaryngology',
                },
                {
                  id: '20530 Radiology and Nuclear Medicine',
                  label: 'Radiology and Nuclear Medicine',
                },
                {
                  id: '20531 Radiation Oncology and Radiobiology',
                  label: 'Radiation Oncology and Radiobiology',
                },
                {
                  id: '20532 Biomedical Technology and Medical Physics',
                  label: 'Biomedical Technology and Medical Physics',
                },
              ],
            },
            {
              id: '206 Neurosciences',
              label: 'Neurosciences',
              children: [
                {
                  id: '20601 Molecular Neuroscience and Neurogenetics',
                  label: 'Molecular Neuroscience and Neurogenetics',
                },
                {
                  id: '20602 Cellular Neuroscience',
                  label: 'Cellular Neuroscience',
                },
                {
                  id: '20603 Developmental Neurobiology',
                  label: 'Developmental Neurobiology',
                },
                {
                  id: '20604 Systemic Neuroscience, Computational Neuroscience, Behaviour',
                  label:
                    'Systemic Neuroscience, Computational Neuroscience, Behaviour',
                },
                {
                  id: '20605 Comparative Neurobiology',
                  label: 'Comparative Neurobiology',
                },
                {
                  id: '20606 Cognitive Neuroscience and Neuroimaging',
                  label: 'Cognitive Neuroscience and Neuroimaging',
                },
                {
                  id: '20607 Molecular Neurology',
                  label: 'Molecular Neurology',
                },
                {
                  id: '20608 Clinical Neurosciences I - Neurology, Neurosurgery',
                  label: 'Clinical Neurosciences I - Neurology, Neurosurgery',
                },
                {
                  id: '20609 Biological Psychiatry',
                  label: 'Biological Psychiatry',
                },
                {
                  id: '20610 Clinical Neurosciences II - Psychiatry, Psychotherapy, Psychosomatic Medicine',
                  label:
                    'Clinical Neurosciences II - Psychiatry, Psychotherapy, Psychosomatic Medicine',
                },
                {
                  id: '20611 Clinical Neurosciences III - Ophthalmology',
                  label: 'Clinical Neurosciences III - Ophthalmology',
                },
              ],
            },
          ],
        },
        {
          id: '23 Agriculture, Forestry, Horticulture and Veterinary Medicine',
          label: 'Agriculture, Forestry, Horticulture and Veterinary Medicine',
          children: [
            {
              id: '207 Agriculture, Forestry, Horticulture and Veterinary Medicine',
              label:
                'Agriculture, Forestry, Horticulture and Veterinary Medicine',
              children: [
                {
                  id: '20701 Soil Sciences',
                  label: 'Soil Sciences',
                },
                {
                  id: '20702 Plant Cultivation',
                  label: 'Plant Cultivation',
                },
                {
                  id: '20703 Plant Nutrition',
                  label: 'Plant Nutrition',
                },
                {
                  id: '20704 Ecology of Agricultural Landscapes',
                  label: 'Ecology of Agricultural Landscapes',
                },
                {
                  id: '20705 Plant Breeding',
                  label: 'Plant Breeding',
                },
                {
                  id: '20706 Phytomedicine',
                  label: 'Phytomedicine',
                },
                {
                  id: '20707 Agricultural and Food Process Engineering',
                  label: 'Agricultural and Food Process Engineering',
                },
                {
                  id: '20708 Agricultural Economics and Sociology',
                  label: 'Agricultural Economics and Sociology',
                },
                {
                  id: '20709 Inventory Control and Use of Forest Resources',
                  label: 'Inventory Control and Use of Forest Resources',
                },
                {
                  id: '20710 Basic Forest Research',
                  label: 'Basic Forest Research',
                },
                {
                  id: '20711 Animal Husbandry, Breeding and Hygiene',
                  label: 'Animal Husbandry, Breeding and Hygiene',
                },
                {
                  id: '20712 Animal Nutrition and Nutrition Physiology',
                  label: 'Animal Nutrition and Nutrition Physiology',
                },
                {
                  id: '20713 Basic Veterinary Medical Science',
                  label: 'Basic Veterinary Medical Science',
                },
                {
                  id: '20714 Basic Research on Pathogenesis, Diagnostics and Therapy and Clinical Veterinary Medicine',
                  label:
                    'Basic Research on Pathogenesis, Diagnostics and Therapy and Clinical Veterinary Medicine',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '3 Natural Sciences',
      label: 'Natural Sciences',
      children: [
        {
          id: '31 Chemistry',
          label: 'Chemistry',
          children: [
            {
              id: '301 Molecular Chemistry',
              label: 'Molecular Chemistry',
              children: [
                {
                  id: '30101 Inorganic Molecular Chemistry',
                  label: 'Inorganic Molecular Chemistry',
                },
                {
                  id: '30102 Organic Molecular Chemistry',
                  label: 'Organic Molecular Chemistry',
                },
              ],
            },
            {
              id: '302 Chemical Solid State and Surface Research',
              label: 'Chemical Solid State and Surface Research',
              children: [
                {
                  id: '30201 Solid State and Surface Chemistry, Material Synthesis',
                  label:
                    'Solid State and Surface Chemistry, Material Synthesis',
                },
                {
                  id: '30202 Physical Chemistry of Solids and Surfaces, Material Characterisation',
                  label:
                    'Physical Chemistry of Solids and Surfaces, Material Characterisation',
                },
                {
                  id: '30203 Theory and Modelling',
                  label: 'Theory and Modelling',
                },
              ],
            },
            {
              id: '303 Physical and Theoretical Chemistry',
              label: 'Physical and Theoretical Chemistry',
              children: [
                {
                  id: '30301 Physical Chemistry of Molecules, Interfaces and Liquids - Spectroscopy, Kinetics',
                  label:
                    'Physical Chemistry of Molecules, Interfaces and Liquids - Spectroscopy, Kinetics',
                },
                {
                  id: '30302 General Theoretical Chemistry',
                  label: 'General Theoretical Chemistry',
                },
              ],
            },
            {
              id: '304 Analytical Chemistry, Method Development (Chemistry)',
              label: 'Analytical Chemistry, Method Development (Chemistry)',
              children: [
                {
                  id: '30401 Analytical Chemistry, Method Development (Chemistry)',
                  label: 'Analytical Chemistry, Method Development (Chemistry)',
                },
              ],
            },
            {
              id: '305 Biological Chemistry and Food Chemistry',
              label: 'Biological Chemistry and Food Chemistry',
              children: [
                {
                  id: '30501 Biological and Biomimetic Chemistry',
                  label: 'Biological and Biomimetic Chemistry',
                },
                {
                  id: '30502 Food Chemistry',
                  label: 'Food Chemistry',
                },
              ],
            },
            {
              id: '306 Polymer Research',
              label: 'Polymer Research',
              children: [
                {
                  id: '30601 Preparatory and Physical Chemistry of Polymers',
                  label: 'Preparatory and Physical Chemistry of Polymers',
                },
                {
                  id: '30602 Experimental and Theoretical Physics of Polymers',
                  label: 'Experimental and Theoretical Physics of Polymers',
                },
                {
                  id: '30603 Polymer Materials',
                  label: 'Polymer Materials',
                },
              ],
            },
          ],
        },
        {
          id: '32 Physics',
          label: 'Physics',
          children: [
            {
              id: '307 Condensed Matter Physics',
              label: 'Condensed Matter Physics',
              children: [
                {
                  id: '30701 Experimental Condensed Matter Physics',
                  label: 'Experimental Condensed Matter Physics',
                },
                {
                  id: '30702 Theoretical Condensed Matter Physics',
                  label: 'Theoretical Condensed Matter Physics',
                },
              ],
            },
            {
              id: '308 Optics, Quantum Optics and Physics of Atoms, Molecules and Plasmas',
              label:
                'Optics, Quantum Optics and Physics of Atoms, Molecules and Plasmas',
              children: [
                {
                  id: '30801 Optics, Quantum Optics, Atoms, Molecules, Plasmas',
                  label: 'Optics, Quantum Optics, Atoms, Molecules, Plasmas',
                },
              ],
            },
            {
              id: '309 Particles, Nuclei and Fields',
              label: 'Particles, Nuclei and Fields',
              children: [
                {
                  id: '30901 Particles, Nuclei and Fields',
                  label: 'Particles, Nuclei and Fields',
                },
              ],
            },
            {
              id: '310 Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
              label:
                'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
              children: [
                {
                  id: '31001 Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
                  label:
                    'Statistical Physics, Soft Matter, Biological Physics, Nonlinear Dynamics',
                },
              ],
            },
            {
              id: '311 Astrophysics and Astronomy',
              label: 'Astrophysics and Astronomy',
              children: [
                {
                  id: '31101 Astrophysics and Astronomy',
                  label: 'Astrophysics and Astronomy',
                },
              ],
            },
          ],
        },
        {
          id: '33 Mathematics',
          label: 'Mathematics',
          children: [
            {
              id: '312 Mathematics',
              label: 'Mathematics',
              children: [
                {
                  id: '31201 Mathematics',
                  label: 'Mathematics',
                },
              ],
            },
          ],
        },
        {
          id: '34 Geosciences (including Geography)',
          label: 'Geosciences (including Geography)',
          children: [
            {
              id: '313 Atmospheric Science and Oceanography',
              label: 'Atmospheric Science and Oceanography',
              children: [
                {
                  id: '31301 Atmospheric Science',
                  label: 'Atmospheric Science',
                },
                {
                  id: '31302 Oceanography',
                  label: 'Oceanography',
                },
              ],
            },
            {
              id: '314 Geology and Palaeontology',
              label: 'Geology and Palaeontology',
              children: [
                {
                  id: '31401 Geology and Palaeontology',
                  label: 'Geology and Palaeontology',
                },
              ],
            },
            {
              id: '315 Geophysics and Geodesy',
              label: 'Geophysics and Geodesy',
              children: [
                {
                  id: '31501 Geophysics',
                  label: 'Geophysics',
                },
                {
                  id: '31502 Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartogaphy',
                  label:
                    'Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartogaphy',
                },
              ],
            },
            {
              id: '316 Geochemistry, Mineralogy and Crystallography',
              label: 'Geochemistry, Mineralogy and Crystallography',
              children: [
                {
                  id: '31601 Geochemistry, Mineralogy and Crystallography',
                  label: 'Geochemistry, Mineralogy and Crystallography',
                },
              ],
            },
            {
              id: '317 Geography',
              label: 'Geography',
              children: [
                {
                  id: '31701 Physical Geography',
                  label: 'Physical Geography',
                },
                {
                  id: '31702 Human Geography',
                  label: 'Human Geography',
                },
              ],
            },
            {
              id: '318 Water Research',
              label: 'Water Research',
              children: [
                {
                  id: '31801 Hydrogeology, Hydrology, Limnology, Urban Water Management, Water Chemistry, Integrated Water Resources Management',
                  label:
                    'Hydrogeology, Hydrology, Limnology, Urban Water Management, Water Chemistry, Integrated Water Resources Management',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '4 Engineering Sciences',
      label: 'Engineering Sciences',
      children: [
        {
          id: '41 Mechanical and industrial Engineering',
          label: 'Mechanical and industrial Engineering',
          children: [
            {
              id: '401 Production Technology',
              label: 'Production Technology',
              children: [
                {
                  id: '40101 Metal-Cutting Manufacturing Engineering',
                  label: 'Metal-Cutting Manufacturing Engineering',
                },
                {
                  id: '40102 Primary Shaping and Reshaping Technology',
                  label: 'Primary Shaping and Reshaping Technology',
                },
                {
                  id: '40103 Micro-, Precision, Mounting, Joining, Separation Technology',
                  label:
                    'Micro-, Precision, Mounting, Joining, Separation Technology',
                },
                {
                  id: '40104 Plastics Engineering',
                  label: 'Plastics Engineering',
                },
                {
                  id: '40105 Production Automation, Factory Operation, Operations Manangement',
                  label:
                    'Production Automation, Factory Operation, Operations Manangement',
                },
              ],
            },
            {
              id: '402 Mechanics and Constructive Mechanical Engineering',
              label: 'Mechanics and Constructive Mechanical Engineering',
              children: [
                {
                  id: '40201 Construction, Machine Elements',
                  label: 'Construction, Machine Elements',
                },
                {
                  id: '40202 Mechanics',
                  label: 'Mechanics',
                },
                {
                  id: '40203 Lightweight Construction, Textile Technology',
                  label: 'Lightweight Construction, Textile Technology',
                },
                {
                  id: '40204 Acoustics',
                  label: 'Acoustics',
                },
              ],
            },
          ],
        },
        {
          id: '42 Thermal Engineering/Process Engineering',
          label: 'Thermal Engineering/Process Engineering',
          children: [
            {
              id: '403 Process Engineering, Technical Chemistry',
              label: 'Process Engineering, Technical Chemistry',
              children: [
                {
                  id: '40301 Chemical and Thermal Process Engineering',
                  label: 'Chemical and Thermal Process Engineering',
                },
                {
                  id: '40302 Technical Chemistry',
                  label: 'Technical Chemistry',
                },
                {
                  id: '40303 Mechanical Process Engineering',
                  label: 'Mechanical Process Engineering',
                },
                {
                  id: '40304 Biological Process Engineering',
                  label: 'Biological Process Engineering',
                },
              ],
            },
            {
              id: '404 Heat Energy Technology, Thermal Machines, Fluid Mechanics',
              label:
                'Heat Energy Technology, Thermal Machines, Fluid Mechanics',
              children: [
                {
                  id: '40401 Energy Process Engineering',
                  label: 'Energy Process Engineering',
                },
                {
                  id: '40402 Technical Thermodynamics',
                  label: 'Technical Thermodynamics',
                },
                {
                  id: '40403 Fluid Mechanics',
                  label: 'Fluid Mechanics',
                },
                {
                  id: '40404 Hydraulic and Turbo Engines and Piston Engines',
                  label: 'Hydraulic and Turbo Engines and Piston Engines',
                },
              ],
            },
          ],
        },
        {
          id: '43 Materials Science and Engineering',
          label: 'Materials Science and Engineering',
          children: [
            {
              id: '405 Materials Engineering',
              label: 'Materials Engineering',
              children: [
                {
                  id: '40501 Metallurgical and Thermal Processes, Thermomechanical Treatment of Materials',
                  label:
                    'Metallurgical and Thermal Processes, Thermomechanical Treatment of Materials',
                },
                {
                  id: '40502 Sintered Metallic and Ceramic Materials',
                  label: 'Sintered Metallic and Ceramic Materials',
                },
                {
                  id: '40503 Composite Materials',
                  label: 'Composite Materials',
                },
                {
                  id: '40504 Mechanical Behaviour of Construction Materials',
                  label: 'Mechanical Behaviour of Construction Materials',
                },
                {
                  id: '40505 Coating and Surface Technology',
                  label: 'Coating and Surface Technology',
                },
              ],
            },
            {
              id: '406 Materials Science',
              label: 'Materials Science',
              children: [
                {
                  id: '40601 Thermodynamics and Kinetics of Materials',
                  label: 'Thermodynamics and Kinetics of Materials',
                },
                {
                  id: '40602 Synthesis and Properties of Functional Materials',
                  label: 'Synthesis and Properties of Functional Materials',
                },
                {
                  id: '40603 Microstructural Mechanical Properties of Materials',
                  label: 'Microstructural Mechanical Properties of Materials',
                },
                {
                  id: '40604 Structuring and Functionalisation',
                  label: 'Structuring and Functionalisation',
                },
                {
                  id: '40605 Biomaterials',
                  label: 'Biomaterials',
                },
              ],
            },
          ],
        },
        {
          id: '44 Computer Science, Electrical and System Engineering',
          label: 'Computer Science, Electrical and System Engineering',
          children: [
            {
              id: '407 Systems Engineering',
              label: 'Systems Engineering',
              children: [
                {
                  id: '40701 Automation, Control Systems, Robotics, Mechatronics',
                  label: 'Automation, Control Systems, Robotics, Mechatronics',
                },
                {
                  id: '40702 Measurement Systems',
                  label: 'Measurement Systems',
                },
                {
                  id: '40703 Microsystems',
                  label: 'Microsystems',
                },
                {
                  id: '40704 Traffic and Transport Systems, Logistics',
                  label: 'Traffic and Transport Systems, Logistics',
                },
                {
                  id: '40705 Human Factors, Ergonomics, Human-Machine Systems',
                  label: 'Human Factors, Ergonomics, Human-Machine Systems',
                },
              ],
            },
            {
              id: '408 Electrical Engineering',
              label: 'Electrical Engineering',
              children: [
                {
                  id: '40801 Electronic Semiconductors, Components, Circuits, Systems',
                  label:
                    'Electronic Semiconductors, Components, Circuits, Systems',
                },
                {
                  id: '40802 Communication, High-Frequency and Network Technology, Theoretical Electrical Engineering',
                  label:
                    'Communication, High-Frequency and Network Technology, Theoretical Electrical Engineering',
                },
                {
                  id: '40803 Electrical Energy Generation, Distribution, Application',
                  label:
                    'Electrical Energy Generation, Distribution, Application',
                },
              ],
            },
            {
              id: '409 Computer Science',
              label: 'Computer Science',
              children: [
                {
                  id: '40901 Theoretical Computer Science',
                  label: 'Theoretical Computer Science',
                },
                {
                  id: '40902 Software Technology',
                  label: 'Software Technology',
                },
                {
                  id: '40903 Operating, Communication and Information Systems',
                  label: 'Operating, Communication and Information Systems',
                },
                {
                  id: '40904 Artificial Intelligence, Image and Language Processing',
                  label:
                    'Artificial Intelligence, Image and Language Processing',
                },
                {
                  id: '40905 Computer Architecture and Embedded Systems',
                  label: 'Computer Architecture and Embedded Systems',
                },
              ],
            },
          ],
        },
        {
          id: '45 Construction Engineering and Architecture',
          label: 'Construction Engineering and Architecture',
          children: [
            {
              id: '410 Construction Engineering and Architecture',
              label: 'Construction Engineering and Architecture',
              children: [
                {
                  id: '41001 Architecture, Building and Construction History, Sustainable Building Technology, Building Design',
                  label:
                    'Architecture, Building and Construction History, Sustainable Building Technology, Building Design',
                },
                {
                  id: '41002 Urbanism, Spatial Planning, Transportation and Infrastructure Planning, Landscape Planning',
                  label:
                    'Urbanism, Spatial Planning, Transportation and Infrastructure Planning, Landscape Planning',
                },
                {
                  id: '41003 Construction Material Sciences, Chemistry, Building Physics',
                  label:
                    'Construction Material Sciences, Chemistry, Building Physics',
                },
                {
                  id: '41004 Structural Engineering, Building Informatics, Construction Operation',
                  label:
                    'Structural Engineering, Building Informatics, Construction Operation',
                },
                {
                  id: '41005 Applied Mechanics, Statics and Dynamics',
                  label: 'Applied Mechanics, Statics and Dynamics',
                },
                {
                  id: '41006 Geotechnics, Hydraulic Engineering',
                  label: 'Geotechnics, Hydraulic Engineering',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  metadataStandards: [
    {
      id: 'ABCD - Access to Biological Collection Data',
      label: 'ABCD - Access to Biological Collection Data',
    },
    {
      id: 'AgMES - Agricultural Metadata Element Set',
      label: 'AgMES - Agricultural Metadata Element Set',
    },
    {
      id: 'AVM - Astronomy Visualization Metadata',
      label: 'AVM - Astronomy Visualization Metadata',
    },
    {
      id: 'CF (Climate and Forecast) Metadata Conventions',
      label: 'CF (Climate and Forecast) Metadata Conventions',
    },
    {
      id: 'CIF - Crystallographic Information Framework',
      label: 'CIF - Crystallographic Information Framework',
    },
    {
      id: 'CIM - Common Information Model',
      label: 'CIM - Common Information Model',
    },
    {
      id: 'CSMD-CCLRC Core Scientific Metadata Model',
      label: 'CSMD-CCLRC Core Scientific Metadata Model',
    },
    {
      id: 'Darwin Core',
      label: 'Darwin Core',
    },
    {
      id: 'DataCite Metadata Schema',
      label: 'DataCite Metadata Schema',
    },
    {
      id: 'DCAT - Data Catalog Vocabulary',
      label: 'DCAT - Data Catalog Vocabulary',
    },
    {
      id: 'DDI - Data Documentation Initiative',
      label: 'DDI - Data Documentation Initiative',
    },
    {
      id: 'DIF - Directory Interchange Format',
      label: 'DIF - Directory Interchange Format',
    },
    {
      id: 'Dublin Core',
      label: 'Dublin Core',
    },
    {
      id: 'EML - Ecological Metadata Language',
      label: 'EML - Ecological Metadata Language',
    },
    {
      id: 'FGDC/CSDGM - Federal Geographic Data Committee Content Standard for Digital Geospatial Metadata',
      label:
        'FGDC/CSDGM - Federal Geographic Data Committee Content Standard for Digital Geospatial Metadata',
    },
    {
      id: 'FITS - Flexible Image Transport System',
      label: 'FITS - Flexible Image Transport System',
    },
    {
      id: 'Genome Metadata',
      label: 'Genome Metadata',
    },
    {
      id: 'International Virtual Observatory Alliance Technical Specifications',
      label:
        'International Virtual Observatory Alliance Technical Specifications',
    },
    {
      id: 'ISA-Tab',
      label: 'ISA-Tab',
    },
    {
      id: 'ISO 19115',
      label: 'ISO 19115',
    },
    {
      id: 'MIBBI - Minimum Information for Biological and Biomedical Investigations',
      label:
        'MIBBI - Minimum Information for Biological and Biomedical Investigations',
    },
    {
      id: 'MIDAS-Heritage',
      label: 'MIDAS-Heritage',
    },
    {
      id: 'OAI-ORE - Open Archives Initiative Object Reuse and Exchange',
      label: 'OAI-ORE - Open Archives Initiative Object Reuse and Exchange',
    },
    {
      id: 'Observ-OM',
      label: 'Observ-OM',
    },
    {
      id: 'Observations and Measurements',
      label: 'Observations and Measurements',
    },
    {
      id: 'OME-XML - Open Microscopy Environment XML',
      label: 'OME-XML - Open Microscopy Environment XML',
    },
    {
      id: 'Protocol Data Element Definitions',
      label: 'Protocol Data Element Definitions',
    },
    {
      id: 'PROV',
      label: 'PROV',
    },
    {
      id: 'QuDEx - Qualitative Data Exchange Format',
      label: 'QuDEx - Qualitative Data Exchange Format',
    },
    {
      id: 'RDF Data Cube Vocabulary',
      label: 'RDF Data Cube Vocabulary',
    },
    {
      id: 'Repository-Developed Metadata Schemas',
      label: 'Repository-Developed Metadata Schemas',
    },
    {
      id: 'SDMX - Statistical Data and Metadata Exchange',
      label: 'SDMX - Statistical Data and Metadata Exchange',
    },
    {
      id: 'SPASE Data Model',
      label: 'SPASE Data Model',
    },
    {
      id: 'other',
      label: 'other',
    },
  ],
};
