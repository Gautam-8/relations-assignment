const express = require("express");
const mongoose =  require("mongoose");


const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/library" , { useNewUrlParser: true ,useUnifiedTopology: true})
}


//section schema

const sectionSchema = new mongoose.Schema ({
  section_name: {type: String, required:true }
},
{
  versionKey: false,
  //timestamps: true,
}
) 

const Section = mongoose.model( "section" , sectionSchema);


//book schema
const bookSchema = new mongoose.Schema ({

  book_name :{type:String , required:true},
  body:{type:String , required:true},

  section_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"section",
    required:true
  },
  author_ids:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"author",
    required:true
  }]

},
{
  versionKey: false,
 // timestamps: true,
}
);

const Book = mongoose.model( "book" , bookSchema);

//author schema

const authorScehma = new mongoose.Schema({

  first_name : {type: String, required: true},
  last_name : {type: String, required: true}

},
{
  versionKey: false,
  //timestamps: true,
}
)

const Author = mongoose.model( "author", authorScehma);



//checkout schema
const checkoutSchema = new mongoose.Schema({

  book_id:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"book",
    required:true
  }
},
{
  versionKey: false,
 // timestamps: true,
}
)

const Checkout = mongoose.model( "checkout", checkoutSchema);


const app = express();
app.use(express.json());


//section crud
app.post("/sections" , async (req, res) => {

  try{
  const section = await Section.create(req.body);
  res.status(201).send(section);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections" , async (req, res) => {

  try{
  const sections = await Section.find().lean().exec();
  res.status(201).send(sections);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.get("/sections/:id" , async (req, res) => {

  try{
  const section = await Section.findById(req.params.id).lean().exec();
  res.status(201).send(section);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/sections/:id" , async (req, res) => {

  try{
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  res.status(201).send(section);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/sections/:id" , async (req, res) => {

  try{
  const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
  res.status(201).send(section);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


//author crud
app.post("/authors" , async (req, res) => {

  try{
  const author = await Author.create(req.body);
  res.status(201).send(author);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors" , async (req, res) => {

  try{
  const authors = await Author.find().lean().exec();
  res.status(201).send(authors);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.get("/authors/:id" , async (req, res) => {

  try{
  const author = await Author.findById(req.params.id).lean().exec();
  res.status(201).send(author);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/authors/:id" , async (req, res) => {

  try{
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  res.status(201).send(author);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/authors/:id" , async (req, res) => {

  try{
  const author = await Author.findByIdAndDelete(req.params.id).lean().exec();
  res.status(201).send(author);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});



//book crud
app.post("/books" , async (req, res) => {

  try{
  const book = await Book.create(req.body);
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books" , async (req, res) => {

  try{
  const books = await Book.find().populate("section_id").populate("author_ids").lean().exec();
  res.status(201).send(books);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.get("/books/:id" , async (req, res) => {

  try{
  const book = await Book.findById(req.params.id).populate("section_id").populate("author_ids").lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/books/:id" , async (req, res) => {

  try{
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/books/:id" , async (req, res) => {

  try{
  const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});



//checkout schema

app.post("/checkout" , async (req, res) => {

  try{
  const checkout = await Checkout.create(req.body);
  res.status(201).send(checkout);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkout" , async (req, res) => {

  try{
  const books = await Checkout.find().populate({ path: "book_id", select: "book_name" }).lean().exec();
  res.status(201).send(books);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.get("/checkout/:id" , async (req, res) => {

  try{
  const book = await Checkout.findById(req.params.id).populate({ path: "book_id", select: "book_name" }).lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/checkout/:id" , async (req, res) => {

  try{
  const book = await Checkout.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/checkout/:id" , async (req, res) => {

  try{
  const book = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
  res.status(201).send(book);
  }
  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//different
//author to book
app.get("/authors/:id/books", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();
    const books = await Book.find({ author_ids: author._id} ,{book_name:1})
      .populate({path:"author_ids",select:"first_name"})
      .lean()
      .exec();

    return res.status(200).send({books , author});
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


//books in section
app.get("/sections/:id/books", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();
    const books = await Book.find({ section_id: section._id } , { book_name:1} )
      .populate({path:"section_id",select:"section_name"})
      .lean()
      .exec();

    return res.status(200).send({ books,section });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


// book  author  section 
app.get("/sections/:id1/authors/:id2/books", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id1).lean().exec();
    const author = await Author.findById(req.params.id2).lean().exec();
    const books = await Book.find({ section_id: section._id , author_ids: author._id})
      .populate({path:"section_id",select:"section_name"}).populate({path:"author_ids",select:"first_name"})
      .lean()
      .exec();

    return res.status(200).send( {books} );
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});



// not checkout

app.get("/notcheckout/:id" , async (req ,res) => {

  try{

  const section = await Section.findById(req.params.id).lean().exec(); 
  const books = await Book.find({section_id:section._id}).lean().exec();
  const checkout = await Checkout.find().lean().exec();

  var notbook = [];

  var makearray = checkout.forEach( (book) => {
  notbook.push(book.book_id.toString());
  });

   var ntcheckout = [];
   var ans = books.forEach( (book) => {

   let c = book._id.toString();
  
    if(!notbook.includes(c)){
      ntcheckout.push(book);
    }
})

  return res.status(200).send({ntcheckout});

  }

  catch(e){
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
})

app.listen(4455, async () => {
     await connect();
    console.log("Listening on port 4455");
})

