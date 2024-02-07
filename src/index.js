const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs');

/**
 * Generates image captions using object detection and a template-based approach.
 *
 * @param {string} imagePath - Path to the image file.
 * @param {number} maxCaptions - Maximum number of captions to generate (optional).
 *
 * @returns {Promise<string[]>} Array of generated captions.
 */
async function getImageCaptions(imagePath, maxCaptions = 1) {
  try {
    // Load the object detection model
    const objectDetectionModel = await cocoSsd.load();

    // Read the image file as a Buffer
    const buffer = fs.readFileSync(imagePath);

    // Decode the image into a tensor
    const imageTensor = tf.node.decodeImage(buffer);

    // Run object detection with confidence scores
    const predictions = await objectDetectionModel.detect(imageTensor);

    if (predictions.length === 0) {
      // Fallback caption
      return ['No objects detected in the image.']; 
    }

    // Extract object labels with confidence scores (optional)
    const objects = predictions.map(
      prediction => `${prediction.class} (${Math.round(prediction.score * 100)}%)`
    );

    // Generate captions based on detected objects
    const captions = [];
    for (let i = 0; i < Math.min(maxCaptions, predictions.length); i++) {
      const caption = `The image contains ${objects[i]}.`; 
      // Template-based caption
      captions.push(caption);
    }

    return captions;
  } catch (error) {
    console.error('Error:', error);
    // Fallback caption
    return ['An error occurred while processing the image.']; 
  }
}

// Example usage
const imagePath = "../src/cat.png";
// const imagePath = "../src/dog.jpeg";
getImageCaptions(imagePath, 2).then(captions => {
  console.log('Captions:', captions);
});
