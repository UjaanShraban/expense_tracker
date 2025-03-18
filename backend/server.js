const app = require('./index');
const PORT = 5555;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
