const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const fs = require('fs');

async function getImageCaptions(imagePath) {
  try {
    // Load the COCO-SSD model
    const model = await cocoSsd.load();

    // Read the image file as a Buffer
    const buffer = fs.readFileSync(imagePath);

    // Decode the image into a tensor
    const imageTensor = tf.node.decodeImage(buffer);

    // Run object detection
    const predictions = await model.detect(imageTensor);

    if (predictions.length === 0) {
      return 'No objects detected in the image.'; // Fallback caption
    }

    // Extract object labels
    const objects = predictions.map(prediction => prediction.class);

    // Generate caption based on detected objects
    const caption = `A ${objects.join(', ')} in the image.`;

    return caption; // Return the generated caption string
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while processing the image.'; // Fallback caption
  }
}

// Example usage
const imagePath = "../src/cat.jpeg";
getImageCaptions(imagePath).then(caption => console.log('Caption:', caption));
