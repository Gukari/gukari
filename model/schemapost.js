const mongoose = require('mongoose');
const Kanbanboard = require('./home/workspace/kanbanboard'); // Assuming the schema is in a separate file
const User = require('./auth/user'); // Import the User model

// Connect to MongoDB
  mongoose.connect('mongodb+srv://zlivhe:pVGMDmaGmxRCenYU@gukari.w3j3o1v.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Create a new video upload instance
    const kanbanboard = new Kanbanboard({
      title: "My first Kanbanboard",
      rows: [
        {
          title: "Row 1",
          position: 0,
          cards: [
            {
              title: "Card 0",
              description: "This is a test card",
              position: 0,
              row: 0,
              dueDate: "2020-10-10",
              

            },
            {
              title: "Card 1",
              description: "This is a test card",
              position: 1,
              row: 0,
              dueDate: "2020-10-10",
              

            },  {
              title: "Card 2",
              description: "This is a test card",
              position: 2,
              row: 0,
              dueDate: "2020-10-10",
              

            },   {
              title: "Card 3",
              description: "This is a test card",
              position: 3,
              row: 0,
              dueDate: "2020-10-10",
              

            }
              
          ]
        },
        {
          title: "Row 2",
          position: 1,
          cards: [
            {
              title: "Card 0",
              description: "This is a Mad card",
              position: 0,
              row: 1,
              dueDate: "2020-10-10",
              

            },
            {
              title: "Card 2",
              description: "This is a test card",
              position: 1,
              row: 1,
              dueDate: "2020-10-10",
              

            },  {
              title: "Card 2",
              description: "This is a test card",
              position: 2,
              row: 1,
              dueDate: "2020-10-10",
              

            },   {
              title: "Card 3",
              description: "This is a test card",
              position: 3,
              row: 1,
              dueDate: "2020-10-10",
              

            }
              
          ]
        },
        {
          title: "Row 3",
          position: 2,
          cards: [
            {
              title: "Damnn som",
              description: "This is a Mad card3",
              position: 1,
              row: 2,
              dueDate: "2020-10-10",
              

            },
            {
              title: "Card 0",
              description: "This is a test card",
              position: 0,
              dueDate: "2020-10-10",
              

            },  {
              title: "Card 2",
              description: "This is a test card",
              position: 2,
              row: 2,
              dueDate: "2020-10-10",
              

            },   {
              title: "Card 3",
              description: "This is a test card",
              position: 3,
              row: 2,
              dueDate: "2020-10-10",
              

            }
              
          ]
        }
      ],
      description: "This is a test Kanbanboard",
      type: "School notes",
      workspace: "5f9c3e7d6f7b8c2c5c8b2f0e",
      visability: true,
      bgimage: "https://images.unsplash.com/photo-1603104291089-5a1f6f7c7d6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      imageurl: "https://images.unsplash.com/photo-1603104291089-5a1f6f7c7d6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",

    });

    // Save the video upload instance to the database
    kanbanboard.save()
      .then((savedkanbanboard) => {
        console.log('Video upload saved:', savedkanbanboard);
      })
      .catch((error) => {
        console.error('Error saving video upload:', error);
      })
      .finally(() => {
        // Disconnect from the database after saving
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
