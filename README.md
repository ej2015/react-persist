# React Persist 💾

Persist and rehydrate React state to storage (localStorage / sessionStorage). This is a folk from [react-persist](https://github.com/jaredpalmer/react-persist).

```
npm install react-persist-plus --save
```

# Basic Usage

Just import the `<Persist >` component and pass it the data you want it to persist. It renders `null`, so it can go wherever you need it to....

```js
import React from 'react'
import { Persist } from 'react-persist-plus'

class Signup extends React.Component {
  state = {
   firstName: '',
   lastName: '',
   email: '',
   isLoading: false,
   error: null
  };

  // ...

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* whatever....*/}
        <Persist 
          name="signup-form" 
          data={this.state} 
          debounce={500} 
          onMount={data => this.setState(data)}
          store='localStorage'
        />
      </form>
    )
  }
```

### Props

Only a few of them!

- `store`: localStorage or sessionStorage. Defatuls to sessionStorage
- `name: string`: Storage key to save form state to
- `data: any`: Data to persist
- `debounce:? number`:  Number of ms to debounce the function that saves form state. Default is `300`.
- `onMount: (data: any) => void`: (optionally) Hydrate your data (into React state). Will only be called if data is not `null`.

## Todo

- Support AsyncStorage for React Native
