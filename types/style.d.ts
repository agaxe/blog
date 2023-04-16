// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: {
      default: string;
      header: string;
      button: string;
    };
    color: {
      default: string;
      gray: string;
      button: string;
    };
    border: {
      gray: string;
      bookmark: string;
    };
  }
}
