SystemLib
=========

A short 'standard library' for TypeScript.

Presently contains a basic ArrayList and LinkedList, and Queue. All very basic and not general purpose yet.

To test it:

    cd tests
    tsc --noImplicitAny --out tests.js -t ES5 tests.ts
   
Then load the html file containing the tests.

These are (C)2014 by Jeffrey Drake.
If you want to use it, just ask. Might add a license later, probably Apache or something along those lines.
