const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Resizes a local image and saves it in the 'images' folder.
 *
 * @param {string} inputFilePath - Path to the local image file.
 * @param {number} width - Desired width of the resized image.
 * @param {number} height - Desired height of the resized image.
 * @returns {Promise<string>} - Path of the saved resized image.
 */
async function resizeAndSaveImage(inputFilePath, width, height) {
  const folderPath = path.join(__dirname, 'images');
  const outputFilePath = path.join(folderPath, `resized-${width}x${height}.png`);

  // Create 'images' folder if it doesn't exist
  fs.mkdirSync(folderPath, { recursive: true });

  // Resize and save the image
  await sharp(inputFilePath).resize(width, height).toFile(outputFilePath);

  return outputFilePath;
}

// Read user input using readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the path to the image file: ', (inputFilePath) => {
  rl.question('Enter the desired width: ', (widthInput) => {
    rl.question('Enter the desired height: ', async (heightInput) => {
      const width = parseInt(widthInput, 10);
      const height = parseInt(heightInput, 10);

      if (isNaN(width) || isNaN(height)) {
        console.error('Width and height must be numbers.');
        rl.close();
        return;
      }

      try {
        const savedFilePath = await resizeAndSaveImage(inputFilePath, width, height);
        console.log(`Image resized and saved to: ${savedFilePath}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      } finally {
        rl.close();
      }
    });
  });
});
