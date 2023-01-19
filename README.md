# Notes APP using Vite + React + TS

### Libraries/Tools used:
1. React.ts using `Vite`
2. react-router-dom
3. bootstrap, react-bootstrap for styling

### Module Alias in Vite
- Apart from setting up the alias in [tsconfig.json](tsconfig.json#L19), we need to add a property `resolve.alias` to [vite.config.ts](vite.config.ts#L9).

### React Router nested routes with common layout
- The nested route structure can be seen [here](src/App.tsx#L15).
- In our case, single Note Page(both show & edit page) have a common [layout](src/components/NoteLayout.tsx).
- In the common layout, we refer to actual route using `Outlet` component.
- To pass any data in it we use a prop called context.
- To access the context passed in parent(common) layout, we use a hook called [`useOutletContext`](src/components/NoteLayout.tsx#l19).