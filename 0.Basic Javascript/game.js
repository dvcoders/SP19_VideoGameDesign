
//this is how you can comment in javascript
//most of javascript's syntax is very similar to that of c++

//declaration of variable:
//js uses "var" as the keyword to declare new variable.
//js does have concept of data type,
//but data type doesn't need to be specified for variable

var a;
var b = 10;

//all variables are free to change values of different type.
b = true;
b = "hello world";


//this is how to output to console.
console.log(b);
console.log("To read this outputs, you need to open developer tool");

//open "launcher.html" with... 
//          Internet explore, Firefox, Google chrome, etc
//We don't have anything there yet, but console can be opened by:

//Ex) <using google chrome>
//Right click on the webpage, and click "inspect"
//Then click console tab
//*this will be slightly different for each web program
//*please ask me if you need help with opening it


//here are some basic logics that are almost identical to c++:

//if statement
a = 3;
b = 4;
if(a < b)
{
  console.log("a is less than b");
}

if(b == 3)
{
  console.log("this won't print");
}
else if(b == 4)
{
  console.log("else if, else also works the same");
}
else
{
  console.log("this won't print");
}


//for loop
//remember variable needs "var" keyword, not "int"
for(var i = 0; i < 5; i++)
{
  console.log(i);
}

//while loop
a = 3;
while(a != 0)
{
  console.log("this should print 3 times");
  a--;
}


//Here are how to create functions
//they are slightly different from c++

function test_0()
{
  //code...
}

//function does not have return type
//this means this function can decide to return nothing, or any datatype.
//like this:

function test_1(x, y)
{
  //notice parameter also don't require data type
  if(x < 0)
  {
    //return int
    return 0;
  }
  else if(x < 5)
  {
    //return string
    return "string return value";
  }
  else
  {
    //or, don't return anything
    //nothing
  }//if
}//test_1


//there are more advanced stuff for javascript such as:
//array
//string manipulation
//class
//how to do callback
//...

//but you should be able to look them up if you want to use them
//and they are similar to c++ or other languages

//we won't be using "advanced" stuff as much


