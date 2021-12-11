import functools
import os
import io

from matplotlib import gridspec
import matplotlib.pylab as plt
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image

def crop_center(image):
	"""Returns a cropped square image."""
	shape = image.shape
	new_shape = min(shape[1], shape[2])
	offset_y = max(shape[1] - shape[2], 0) // 2
	offset_x = max(shape[2] - shape[1], 0) // 2
	image = tf.image.crop_to_bounding_box(
		image, offset_y, offset_x, new_shape, new_shape)
	return image

@functools.lru_cache(maxsize=None)
def load_image(image_url, image_size=(256, 256), preserve_aspect_ratio=True):
	"""Loads and preprocesses images."""
	# Cache image file locally.
	image_path = tf.keras.utils.get_file(os.path.basename(image_url)[-128:], image_url)
	# Load and convert to float32 numpy array, add batch dimension, and normalize to range [0, 1].
	img = plt.imread(image_path).astype(np.float32)[np.newaxis, ...]
	if img.max() > 1.0:
		img = img / 255.
	if len(img.shape) == 3:
		img = tf.stack([img, img, img], axis=-1)
	img = crop_center(img)
	img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
	return img

def tensor_to_image(tensor):
    tensor = tensor*255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor)>3:
        assert tensor.shape[0] == 1
        tensor = tensor[0]
    return Image.fromarray(tensor)

# @title Load example images  { display-mode: "form" }
def make_image(content_image_url, style_image_url):
    output_image_size = 384  # @param {type:"integer"}

    # The content image size can be arbitrary.
    content_img_size = (output_image_size, output_image_size)
    # The style prediction model was trained with image size 256 and it's the 
    # recommended image size for the style image (though, other sizes work as 
    # well but will lead to different results).
    style_img_size = (256, 256)  # Recommended to keep it at 256.

    try:
        content_image = load_image('http://localhost:8000' + content_image_url, content_img_size)
    except:
        return None
    style_image = load_image(style_image_url, style_img_size)
    style_image = tf.nn.avg_pool(style_image, ksize=[3,3], strides=[1,1], padding='SAME')

    # Load TF-Hub module.

    hub_handle = 'https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2'
    hub_module = hub.load(hub_handle)

    # Stylize content image with given style image.
    # This is pretty fast within a few milliseconds on a GPU.

    outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
    file = io.BytesIO()
    tensor_to_image(outputs[0]).save(file, 'JPEG')
    return file
