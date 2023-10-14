# Idea
Implement 3 functions: `log()`, `warn()` and `error()` in order to facilitate local execution of Google Cloud Platform functions while maintaining the syntax of those functions via abstracting out the actual function definition. Which definition is being used is dependant on the execution environment

## Function Name = log | warn | error

**Description:** in local mode - write to corresponding files in `logs/*` directory<br>
in cloud environment - use the provided by google implementation which posts to Log Explorer 

**Signature:** `_functionName_(message: string, jsonPayload?: {}): void`

**Parameters:**

- `message` (string): A brief description of what's going on.
- `jsonPayload` (object): (optional) could be passed along with the message to provide more context.

## Approaches
### Functional
What works:
 - callable multiple times
 - keeps independent logs via the closure
 - outputs to files

What doesn't:
 - I have to run `log().done()` in order to accomplish the writing to files, which leaves a lot of space for forgetting to do so. it also strays from the idea of implementing the 'same' function structure, since now not only do I need to change all the import statements, but also the termination points of the body ofa function utilizing them, which starts to defeat the main point

### OOP
This was suggested over on SO. I was able to get it half way there, but it would only write the first log to the files - not the whole array of the logs accumulated in the class. And, to do so, I added a
```javascript
 process.on("exit", () => {    
  this.close()
})
```
to the constructor method.<br>
I wasn't able to get the class to call `close()` whenever it gets out of scope

### "Using" keyword

- Doesn't work
- Would be super neat if it did
- Any help making it work is appreciated...

### As well as any other approaches (please help :sweat_smile:)...


## Discussion
StackOverflow [question](https://stackoverflow.com/questions/77287309/monadic-log-function-writing-to-file-utilizing-using-keyword)