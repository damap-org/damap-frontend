import { LicenseDetails } from '../../domain/license-details';

/***
 Licenses
 id - should be consistent with backend enums
 name - full name
 priority - currently not in use (was supposed to be used in ordering search results)
 url - should be consistent with backend urls
 description - short description of the license
 categories - used to filter licenses
    agpl
    bsd
    by
    copyleft
    data
    gpl
    osi
    nc
    nd
    perl
    permissive
    public
    public-domain
    sa
    software
    strong
    weak
 labels - not in use currently, should be looked over if it is even needed
 code - used for compatibility purposes, should be replaced with id in the future
 compatibility - list of licenses (using code) which are compatible, some licenses came without this field

 ***/

export const agpl1 = {
  id: 'AGPL1',
  name: 'license.wizard.license.agpl1.name',
  priority: 50,
  available: true,
  url: 'https://spdx.org/licenses/AGPL-1.0-only',
  description: 'license.wizard.license.agpl1.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'copyleft'],
  code: 'agpl-1',
  compatibility: ['agpl-1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const agpl1plus = {
  id: 'AGPL1PLUS',
  name: 'license.wizard.license.agpl1plus.name',
  priority: 50,
  available: true,
  url: 'https://spdx.org/licenses/AGPL-1.0-or-later',
  description: 'license.wizard.license.agpl1plus.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'copyleft'],
  code: 'agpl-1plus',
  compatibility: ['agpl-1plus'], // needs to be updated, also is not used in other licenses compatibilities
};
export const agpl3 = {
  id: 'AGPL3',
  name: 'license.wizard.license.agpl3.name',
  priority: 51,
  available: true,
  url: 'https://opensource.org/license/agpl-v3',
  description: 'license.wizard.license.agpl3.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'agpl3', 'copyleft'],
  code: 'agpl-3',
  compatibility: ['agpl-3'],
};
export const agpl3plus = {
  id: 'AGPL3PLUS',
  name: 'license.wizard.license.agpl3plus.name',
  priority: 51,
  available: true,
  url: 'https://spdx.org/licenses/AGPL-3.0-or-later',
  description: 'license.wizard.license.agpl3plus.description',
  categories: ['public', 'software', 'agpl', 'copyleft', 'strong'],
  labels: ['public', 'agpl3', 'copyleft'],
  code: 'agpl-3plus',
  compatibility: ['agpl-3plus'], // needs to be updated, also is not used in other licenses compatibilities
};
export const apache1 = {
  id: 'APACHE1',
  name: 'license.wizard.license.apache1.name',
  priority: 4,
  available: true,
  url: 'https://spdx.org/licenses/Apache-1.0',
  description: 'license.wizard.license.apache1.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'apache', 'osi'],
  code: 'apache-1',
  compatibility: ['apache-1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const apache1_1 = {
  id: 'APACHE1_1',
  name: 'license.wizard.license.apache1_1.name',
  priority: 4,
  available: true,
  url: 'https://opensource.org/license/apache-1-1',
  description: 'license.wizard.license.apache1_1.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'apache', 'osi'],
  code: 'apache-1_1',
  compatibility: ['apache-1_1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const apache2 = {
  id: 'APACHE2',
  name: 'license.wizard.license.apache2.name',
  priority: 4,
  available: true,
  url: 'https://opensource.org/license/apache-2-0',
  description: 'license.wizard.license.apache2.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'apache', 'osi'],
  code: 'apache-2',
  compatibility: ['apache-2', 'lgpl-3', 'mpl-2', 'epl-1', 'gpl-3', 'agpl-3'],
};
export const artistic1 = {
  id: 'ARTISTIC1',
  name: 'license.wizard.license.artistic1.name',
  priority: 7,
  available: true,
  url: 'https://opensource.org/license/artistic-1-0',
  description: 'license.wizard.license.artistic1.description',
  categories: ['public', 'software', 'perl'],
  labels: ['public', 'perl'],
};
export const artistic1Perl = {
  id: 'ARTISTIC1PERL',
  name: 'license.wizard.license.artistic1Perl.name',
  priority: 7,
  available: true,
  url: 'https://opensource.org/license/artistic-perl-1-0-2',
  description: 'license.wizard.license.artistic1Perl.description',
  categories: ['public', 'software', 'perl'],
  labels: ['public', 'perl'],
};
export const artistic2 = {
  id: 'ARTISTIC2',
  name: 'license.wizard.license.artistic2.name',
  priority: 8,
  available: true,
  url: 'https://opensource.org/license/artistic-2-0',
  description: 'license.wizard.license.artistic2.description',
  categories: ['public', 'software', 'perl'],
  labels: ['public', 'perl', 'osi'],
};
export const bsd2c = {
  id: 'BSD2C',
  name: 'license.wizard.license.bsd2c.name',
  priority: 3,
  available: true,
  url: 'https://opensource.org/license/bsd-2-clause',
  description: 'license.wizard.license.bsd2c.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'bsd', 'osi'],
  code: 'bsd-2c',
  compatibility: [
    'bsd-2c',
    'bsd-3c',
    'apache-2',
    'lgpl-2_1',
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'epl-1',
    'cddl-1',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const bsd3c = {
  id: 'BSD3C',
  name: 'license.wizard.license.bsd3c.name',
  priority: 2,
  available: true,
  url: 'https://opensource.org/license/bsd-3-clause',
  description: 'license.wizard.license.bsd3c.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'bsd', 'osi'],
  code: 'bsd-3c',
  compatibility: [
    'bsd-3c',
    'apache-2',
    'lgpl-2_1',
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'epl-1',
    'cddl-1',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const ccBy = {
  id: 'CCBY',
  name: 'license.wizard.license.ccBy.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by/4.0/',
  description: 'license.wizard.license.ccBy.description',
  categories: ['public', 'data', 'by'],
  labels: ['public', 'cc', 'by', 'opendata'],
};
export const ccByNc = {
  id: 'CCBYNC',
  name: 'license.wizard.license.ccByNc.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc/4.0/',
  description: 'license.wizard.license.ccByNc.description',
  categories: ['public', 'data', 'by', 'nc'],
  labels: ['public', 'cc', 'nc'],
};
export const ccByNcNd = {
  id: 'CCBYNCND',
  name: 'license.wizard.license.ccByNcNd.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  description: 'license.wizard.license.ccByNcNd.description',
  categories: ['public', 'data', 'by', 'nc', 'nd'],
  labels: ['public', 'cc', 'by', 'nc', 'nd'],
};
export const ccByNcSa = {
  id: 'CCBYNCSA',
  name: 'license.wizard.license.ccByNcSa.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  description: 'license.wizard.license.ccByNcSa.description',
  categories: ['public', 'data', 'by', 'nc', 'sa'],
  labels: ['public', 'cc', 'by', 'nc', 'sa'],
};
export const ccByNd = {
  id: 'CCBYND',
  name: 'license.wizard.license.ccByNd.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-nd/4.0/',
  description: 'license.wizard.license.ccByNd.description',
  categories: ['public', 'data', 'by', 'nd'],
  labels: ['public', 'cc', 'nd'],
};
export const ccBySa = {
  id: 'CCBYSA',
  name: 'license.wizard.license.ccBySa.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/by-sa/4.0/',
  description: 'license.wizard.license.ccBySa.description',
  categories: ['public', 'data', 'by', 'sa'],
  labels: ['public', 'cc', 'by', 'sa', 'opendata'],
};
export const ccPublicDomain: LicenseDetails = {
  id: 'CCPUBLICDOMAIN',
  name: 'license.wizard.license.ccPublicDomain.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/licenses/publicdomain/',
  description: 'license.wizard.license.ccPublicDomain.description',
  categories: ['public', 'data', 'software', 'public-domain'],
  labels: ['public', 'pd'],
  code: 'cc-public-domain',
  compatibility: [
    'cc-public-domain',
    'mit',
    'bsd-2c',
    'bsd-3c',
    'apache-2',
    'lgpl-2_1',
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'epl-1',
    'cddl-1',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const ccZero = {
  id: 'CCZERO',
  name: 'license.wizard.license.ccZero.name',
  priority: 1,
  available: true,
  url: 'https://creativecommons.org/publicdomain/zero/1.0/',
  description: 'license.wizard.license.ccZero.description',
  categories: ['public', 'data', 'public-domain'],
  labels: ['public', 'cc', 'zero', 'opendata'],
};
export const cddl1 = {
  id: 'CDDL1',
  name: 'license.wizard.license.cddl1.name',
  priority: 5,
  available: true,
  url: 'https://opensource.org/license/cddl-1-0',
  description: 'license.wizard.license.cddl1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'copyleft', 'osi'],
  code: 'cddl-1',
  compatibility: ['cddl-1'],
};
export const cddl1_1 = {
  id: 'CDDL1_1',
  name: 'license.wizard.license.cddl1_1.name',
  priority: 5,
  available: true,
  url: 'https://spdx.org/licenses/CDDL-1.1',
  description: 'license.wizard.license.cddl1_1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'copyleft', 'osi'],
  code: 'cddl-1_1',
  compatibility: ['cddl-1_1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const epl1 = {
  id: 'EPL1',
  name: 'license.wizard.license.epl1.name',
  priority: 4,
  available: true,
  url: 'https://opensource.org/license/epl-1-0',
  description: 'license.wizard.license.epl1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'eclipse', 'copyleft'],
  code: 'epl-1',
  compatibility: ['mpl-2', 'epl-1', 'cddl-1', 'gpl-3', 'agpl-3'],
};
export const epl2 = {
  id: 'EPL2',
  name: 'license.wizard.license.epl2.name',
  priority: 4,
  available: true,
  url: 'https://opensource.org/license/epl-2-0',
  description: 'license.wizard.license.epl2.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'eclipse', 'copyleft'],
  code: 'epl-2',
  compatibility: ['epl-2'], // needs to be updated, also is not used in other licenses compatibilities
};
export const gpl2 = {
  id: 'GPL2',
  name: 'license.wizard.license.gpl2.name',
  priority: 10,
  available: false,
  url: 'https://opensource.org/license/gpl-2-0',
  description: 'license.wizard.license.gpl2.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl', 'copyleft'],
  code: 'gpl-2',
  compatibility: ['gpl-2', 'agpl-1'],
};
export const gpl2plus = {
  id: 'GPL2PLUS',
  name: 'license.wizard.license.gpl2plus.name',
  priority: 10,
  available: true,
  url: 'https://spdx.org/licenses/GPL-2.0-or-later',
  description: 'license.wizard.license.gpl2plus.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl', 'copyleft'],
  code: 'gpl-2plus',
  compatibility: ['gpl-2', 'gpl-2plus', 'gpl-3', 'agpl-1', 'agpl-3'],
};
export const gpl3 = {
  id: 'GPL3',
  name: 'license.wizard.license.gpl3.name',
  priority: 11,
  available: true,
  url: 'https://opensource.org/license/gpl-3-0',
  description: 'license.wizard.license.gpl3.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl3', 'copyleft'],
  code: 'gpl-3',
  compatibility: ['gpl-2plus', 'gpl-3', 'agpl-3'],
};
export const gpl3plus = {
  id: 'GPL3PLUS',
  name: 'license.wizard.license.gpl3plus.name',
  priority: 11,
  available: true,
  url: 'https://spdx.org/licenses/GPL-3.0-or-later',
  description: 'license.wizard.license.gpl3plus.description',
  categories: ['public', 'software', 'gpl', 'copyleft', 'strong'],
  labels: ['public', 'gpl3', 'copyleft'],
  code: 'gpl-3plus',
  compatibility: ['gpl-3plus'], // needs to be updated, also is not used in other licenses compatibilities
};
export const lgpl2 = {
  id: 'LGPL2',
  name: 'license.wizard.license.lgpl2.name',
  priority: 2,
  available: false,
  url: 'https://opensource.org/license/lgpl-2-0',
  description: 'license.wizard.license.lgpl2.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2',
  compatibility: ['lgpl-2'], // needs to be updated, also is not used in other licenses compatibilities
};
export const lgpl2plus = {
  id: 'LGPL2PLUS',
  name: 'license.wizard.license.lgpl2plus.name',
  priority: 2,
  available: false,
  url: 'https://spdx.org/licenses/LGPL-2.0-or-later',
  description: 'license.wizard.license.lgpl2plus.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2plus',
  compatibility: ['lgpl-2plus'], // needs to be updated, also is not used in other licenses compatibilities
};
export const lgpl2_1 = {
  id: 'LGPL2_1',
  name: 'license.wizard.license.lgpl2_1.name',
  priority: 2,
  available: false,
  url: 'https://opensource.org/license/lgpl-2-1',
  description: 'license.wizard.license.lgpl2_1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2_1',
  compatibility: ['lgpl-2_1', 'mpl-2', 'gpl-2', 'agpl-1'],
};
export const lgpl2_1plus = {
  id: 'LGPL2_1PLUS',
  name: 'license.wizard.license.lgpl2_1plus.name',
  priority: 2,
  available: true,
  url: 'https://spdx.org/licenses/LGPL-2.1-or-later',
  description: 'license.wizard.license.lgpl2_1plus.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl', 'copyleft'],
  code: 'lgpl-2_1plus',
  compatibility: [
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const lgpl3 = {
  id: 'LGPL3',
  name: 'license.wizard.license.lgpl3.name',
  priority: 3,
  available: true,
  url: 'https://opensource.org/license/lgpl-3-0',
  description: 'license.wizard.license.lgpl3.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl3', 'copyleft'],
  code: 'lgpl-3',
  compatibility: ['lgpl-3', 'mpl-2', 'gpl-3', 'agpl-3'],
};
export const lgpl3plus = {
  id: 'LGPL3PLUS',
  name: 'license.wizard.license.lgpl3plus.name',
  priority: 3,
  available: true,
  url: 'https://spdx.org/licenses/LGPL-3.0-or-later.html',
  description: 'license.wizard.license.lgpl3plus.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'lgpl3', 'copyleft'],
  code: 'lgpl-3plus',
  compatibility: ['lgpl-3plus'], // needs to be updated, also is not used in other licenses compatibilities
};
export const mit = {
  id: 'MIT',
  name: 'license.wizard.license.mit.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/license/mit',
  description: 'license.wizard.license.mit.description',
  categories: ['public', 'software', 'permissive'],
  labels: ['public', 'mit', 'osi'],
  code: 'mit',
  compatibility: [
    'mit',
    'bsd-2c',
    'bsd-3c',
    'apache-2',
    'lgpl-2_1',
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'epl-1',
    'cddl-1',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const mpl1 = {
  id: 'MPL1',
  name: 'license.wizard.license.mpl1.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/license/mpl-1-0',
  description: 'license.wizard.license.mpl1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'mozilla', 'copyleft'],
  code: 'mpl-1',
  compatibility: ['mpl-1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const mpl1_1 = {
  id: 'MPL1_1',
  name: 'license.wizard.license.mpl1_1.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/license/mpl-1-1',
  description: 'license.wizard.license.mpl1_1.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'mozilla', 'copyleft'],
  code: 'mpl-1_1',
  compatibility: ['mpl-1_1'], // needs to be updated, also is not used in other licenses compatibilities
};
export const mpl2 = {
  id: 'MPL2',
  name: 'license.wizard.license.mpl2.name',
  priority: 1,
  available: true,
  url: 'https://opensource.org/license/mpl-2-0',
  description: 'license.wizard.license.mpl2.description',
  categories: ['public', 'software', 'copyleft', 'weak'],
  labels: ['public', 'mozilla', 'copyleft'],
  code: 'mpl-2',
  compatibility: [
    'lgpl-2_1',
    'lgpl-2_1plus',
    'lgpl-3',
    'mpl-2',
    'gpl-2',
    'gpl-2plus',
    'gpl-3',
    'agpl-1',
    'agpl-3',
  ],
};
export const odbl = {
  id: 'ODBL',
  name: 'license.wizard.license.odbl.name',
  priority: 1,
  available: false,
  url: 'https://spdx.org/licenses/ODbL-1.0',
  description: 'license.wizard.license.odbl.description',
  categories: ['public', 'data', 'by', 'sa'],
  labels: ['public'],
};
export const odcBy = {
  id: 'ODCBY',
  name: 'license.wizard.license.odcBy.name',
  priority: 1,
  available: false,
  url: 'https://spdx.org/licenses/ODC-By-1.0',
  description: 'license.wizard.license.odcBy.description',
  categories: ['public', 'data', 'by'],
  labels: ['public'],
};
export const pddl = {
  id: 'PDDL',
  name: 'license.wizard.license.pddl.name',
  priority: 1,
  available: false,
  url: 'https://spdx.org/licenses/PDDL-1.0',
  description: 'license.wizard.license.pddl.description',
  categories: ['public', 'data', 'public-domain'],
  labels: ['public'],
};

export const LicenseDefinitions: LicenseDetails[] = [
  agpl1,
  agpl1plus,
  agpl3,
  agpl3plus,
  apache1,
  apache1_1,
  apache2,
  artistic1,
  artistic1Perl,
  artistic2,
  bsd2c,
  bsd3c,
  ccBy,
  ccByNc,
  ccByNcNd,
  ccByNcSa,
  ccByNd,
  ccBySa,
  ccPublicDomain,
  ccZero,
  cddl1,
  cddl1_1,
  epl1,
  epl2,
  gpl2,
  gpl2plus,
  gpl3,
  gpl3plus,
  lgpl2,
  lgpl2plus,
  lgpl2_1,
  lgpl2_1plus,
  lgpl3,
  lgpl3plus,
  mit,
  mpl1,
  mpl1_1,
  mpl2,
  odbl,
  odcBy,
  pddl,
];

export const SoftwareLicenses: LicenseDetails[] = [
  agpl1,
  agpl1plus,
  agpl3,
  agpl3plus,
  apache1,
  apache1_1,
  apache2,
  artistic1,
  artistic1Perl,
  artistic2,
  bsd2c,
  bsd3c,
  ccPublicDomain,
  cddl1,
  cddl1_1,
  epl1,
  epl2,
  gpl2,
  gpl2plus,
  gpl3,
  gpl3plus,
  lgpl2,
  lgpl2plus,
  lgpl2_1,
  lgpl2_1plus,
  lgpl3,
  lgpl3plus,
  mit,
  mpl1,
  mpl1_1,
  mpl2,
];

// the order of licenses DataLicenses has to stay the same
// see dataLicenseCompatibility() in license-wizard
export const DataLicenses = [
  [ccPublicDomain, ccZero, pddl],
  [ccBy, odcBy],
  [ccByNc],
  [ccByNcSa],
  [odbl],
  [ccBySa],
  [ccByNd, ccByNcNd],
];
