# useAnimation

A hook to generate styles for animations using animation frames.
This project was done to see if [svelte](https://svelte.dev/)-like animations would be feasible in react. And somewhat based on the work done [here](https://github.com/franciscop/use-animation-frame).

## Example

```jsx
const Example = () => {
  const { styles, triggerAnimation } = useAnimation(() => {
    return {
      delay: 0,
      duration: 300,
      css: (t) => ({
        fontSize: `${t * 200}px`,
      }),
    };
  });

  return (
    <>
      <div style={styles ?? { fontSize: '200px' }}>Hello!</div>
      <button onClick={triggerAnimation}>trigger</button>
    </>
  );
};
```
