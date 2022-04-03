# kpn-assessment

This readme has the following content:
* How to run the project
* Project information
* How this app can be improved

## How to run the project

### Install dependencies
First step is to install the dependencies.   
Move into the root of the project folder and run the installation command:
```  
npm install  
```

### Run the project
To run the application locally:
```  
npm run serve  
```  
The project will run on `localhost:8080` and the mock api will run on `localhost:3000`

### Compiles and minifies for production
```  
npm run build  
```  

### Run your unit tests
```  
npm run test:unit  
```  

### Run your end-to-end tests
Make sure the json-server is running!
```  
npm run test:e2e  
```  

### Run the json server 
This will be used to mock the API:
```  
npm run json-server  
```  
The json-server will run on `localhost:3000`

### Lints and fixes files
```  
npm run lint  
```  
## Project information
### Frameworks / Dependencies
* **VueJS 3**: This is the framework I am most familiar with. Apart from that, it is a light and intuitive framework with a fast growing community.
* **TypeScript** TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications.
* **VueCLI**: This is used to create the project and to install some basic dependencies.   
  This makes creating the project easier, faster and less prone to errors.
* **Babel**: Converts new Javascript syntax and uses polyfills so the code can run on older browsers.
* **ESlint**: Checks the code in the editor for any mistakes or improvements.
* **Prettier**: Formats the code on save. No more comments on pull request about code style.
* **Axios**: HTTP client is widely used for its simplicity and options. It also automatically converts the response to JSON.

### Services
* **ApiService**: This service is used to create a wrapper with a config around Axios. With an interceptor any errors are filtered out and handled appropriately
* **PhoneService**: This service returns all the phones.

### Vuex (state management)
Vuex  has  been  chosen  to  share  state  between  components  and  to  handle  the  logic  involved  with  calling  the  (mock) API. This  makes  the  components  cleaner and  it's  easy  to  find   your  API  logic.

## How this app can be improved
* **Improve test coverage**: Unit test coverage should cover the complete project.
* **CI/CD**: Setting up a pipeline to make deployments to multiple environments and automatic testing.
* **Error handling**: Creating a 404 page, general error page and displaying error messages that helps the user to understand an error has occurred.
* **Analytics**: Create analytics, so we get a better understanding of what is happening with our app.
* **Git hooks**: Implement git hooks that will auto lint and run the tests before pushing your code.
* **User testing**: Have real users test the application, to understand the bottlenecks of the application and improve where needed.
* **Design improvements**: Both mobile responsiveness and the basic design has room for improvement.
* **Spinners**: When the API data is being fetched, there should be a spinner indicating to the user that the request is being handled.    
