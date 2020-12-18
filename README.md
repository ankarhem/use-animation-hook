# useAnimation

A hook to generate styles for animations using animation frames.
This project is inspired by, and extended from, the work done [here](https://github.com/franciscop/use-animation-frame).

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
