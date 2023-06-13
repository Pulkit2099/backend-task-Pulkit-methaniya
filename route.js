const router =require("express").Router()
const { ObjectId } = require("mongodb");
const Contact=require("./models/contact")

//api for creating contCT
router.post('/createContact', (req, res) => {
    const { first_name, last_name, email, mobile_number } = req.body;
  
    const newContact = new Contact({
      first_name,
      last_name,
      email,
      mobile_number,
    });
  
    newContact.save()
      .then(() => {
        res.status(200).json({ message: 'Contact created successfully!' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create contact.' });
      });
  });

//for update
router.post('/updateContact', async (req, res) => {
    const { _id, new_email, new_mobile_number, data_store } = req.body;
    
    // Logic to update the contact based on data_store value
    if (data_store === 'CRM') {
        
        let contact_id = new ObjectId(_id);
        let update = {
            email : new_email,
            mobile_number : new_mobile_number
        }
        console.log(new_mobile_number);
        let filter = {"_id":contact_id};
        let doc = await Contact.findOneAndUpdate(filter,update);
        res.status(200).json({ message: 'Contact updated successfully!' })
        
    }
    
  });

  //
  router.post('/deleteContact', async (req, res) => {
    const { contact_id, data_store } = req.body;
  
    try {
      let message = '';
      if (data_store === 'CRM') {
        // Logic to delete the contact from CRM
        // Implement the code to delete the contact from the CRM system
        // Example using Mongoose ORM with MongoDB
        const deletedContact = await Contact.findOneAndDelete({ _id: contact_id });
  
        if (deletedContact) {
          message = 'Contact deleted from CRM successfully!';
        } else {
          message = 'Contact not found in CRM!';
        }
      } else if (data_store === 'DATABASE') {
        // Logic to delete the contact from the database
        // Implement the code to delete the contact from the database
        // Example using Mongoose ORM with MongoDB
        const deletedContact = await Contact.findOneAndDelete({ _id: contact_id });
  
        if (deletedContact) {
          message = 'Contact deleted from the database successfully!';
        } else {
          message = 'Contact not found in the database!';
        }
      } else {
        return res.status(400).json({ message: 'Invalid data_store value. Please provide either "CRM" or "DATABASE".' });
      }
  
      res.status(200).json({ message });
    } catch (error) {
      console.log('Error deleting contact:', error);
      res.status(500).json({ message: 'An error occurred while deleting the contact.' });
    }
  });
  
  
  
  
  
  









  module.exports=router