'use strict';

switch (process.argv[2]) {
  case 'start': {
    require('./start');
    break;
  }
  case 'build': {
    require('./build');
    break;
  }
}