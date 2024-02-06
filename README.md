# Image captioning

A Node.js package for generating captions for images using TensorFlow.js and pre-trained models.

# Installation
Install the package via npm:
    `npm install image-captioning`

# Usage
```JavaScript
    const imageCaptioning = require('image-captioning');
    const imagePath = 'path/to/your/image.jpg';
    imageCaptioning.getImageCaptions(imagePath)
        .then(captions => {
            console.log('Captions:', captions);
        })
        .catch(error => {
            console.error('Error:', error);
        });
```

# API
getImageCaptions(imagePath)
Generates captions for the image located at imagePath.

imagePath (string): Path to the image file.
Returns a Promise that resolves with an array of captions generated for the image.

# Dependencies
@tensorflow/tfjs
@tensorflow-models/coco-ssd

# License
This project is licensed under the MIT License - see the LICENSE file for details.