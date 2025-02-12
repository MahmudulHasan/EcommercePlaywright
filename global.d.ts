declare global {
    namespace NodeJS {
      interface Global {
        productName: string;
      }
    }
  }
  
  export {}; // Ensures this file is treated as a module
  