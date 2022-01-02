# Create Barrel Folder

Create a folder with an index file that exports the module

e.g.

```cbf ComponentName```

creates directory:

```
ComponentName
- ComponentName.tsx
- index.ts
```



 ```
 // index.ts 
 export { default } from './ComponentName'
 ```
