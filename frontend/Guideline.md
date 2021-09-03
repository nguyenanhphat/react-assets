## Guideline for React

### Naming convention 
- Use PascalCase for react component and its containing folder

```
  -- components
    -- LoadingIndicator
      -- LoadingIndicator.js
      -- index.js
      -- style.module.js
```

- use camelCase for custom hooks. E.g: useOutsideClick.js
  
### Components
- Do not prefix component with My. E.g: MyLoading. Use rename import to avoid conflict with 3rd libraries. E.g:

```jsx
import { Button as AntdButton } from 'antd';

export const Button = props => {
  return <AntdButton {...props}>
}

```
- index.js is only used to re-export, not to define component. E.g: 
```js
export { default } from './Button';
```

### Styling
- Use css module to avoid style conflict. E.g: Instead of using button.css, using button.module.css. More information: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
  
### Data fetching
- Use [react-query](https://react-query.tanstack.com/) for data fetching updating instead of redux

### Date time
- Use [date-fns](https://date-fns.org/), don't use moment