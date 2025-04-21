#!/usr/bin/env python3
"""
Image Downloader for Pakistan Under Siege Website
-------------------------------------------------
This script downloads free-to-use images from Unsplash and Wikimedia Commons
for use in the Pakistan Under Siege website.

Requirements:
- requests
- os
- sys

Install requirements with: pip install requests
"""

import os
import sys
import requests
from urllib.parse import urlparse
from datetime import datetime

# Create a timestamp for the download log
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Image URLs
IMAGES = {
    # For index.html
    "protest-scene.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Protest_against_enforced_disappearances_in_Balochistan_outside_U.S._Capitol.JPG/1280px-Protest_against_enforced_disappearances_in_Balochistan_outside_U.S._Capitol.JPG",
    
    # For khan.html
    "imran-khan-hero.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Khan_inauguration_%28cropped%29.jpg/800px-Imran_Khan_inauguration_%28cropped%29.jpg",
    "khan-cricket.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Imran_Khan_1987_crop.jpg/800px-Imran_Khan_1987_crop.jpg",
    "shaukat-khanum.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Shaukat_Khanum_Hospital.jpg/800px-Shaukat_Khanum_Hospital.jpg",
    "namal-university.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Namal_University.jpg/800px-Namal_University.jpg",
    "pti-rally.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/PTI_Azadi_March_Islamabad.jpg/800px-PTI_Azadi_March_Islamabad.jpg",
    "pm-oath.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Khan_inauguration_%28cropped%29.jpg/800px-Imran_Khan_inauguration_%28cropped%29.jpg",
    "khan-protest.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Imran_Khan_-_2022_%28cropped%29.jpg/800px-Imran_Khan_-_2022_%28cropped%29.jpg",
    
    # Logo images (small, simple logo files)
    "time-logo.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Time_Magazine_logo.svg/240px-Time_Magazine_logo.svg.png",
    "un-logo.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/240px-UN_emblem_blue.svg.png",
    "icc-logo.png": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/International_Cricket_Council_logo.svg/240px-International_Cricket_Council_logo.svg.png",
    "forbes-logo.png": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/240px-Forbes_logo.svg.png"
}

def download_image(url, filename):
    """Download an image from a URL and save it to the specified filename."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        file_size = os.path.getsize(filename) / 1024  # Size in KB
        print(f"✅ Downloaded {filename} ({file_size:.1f} KB)")
        return True
    except Exception as e:
        print(f"❌ Failed to download {filename}: {str(e)}")
        return False

def main():
    """Main function to download all images."""
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.realpath(__file__))
    
    # Count success and failures
    success_count = 0
    failure_count = 0
    
    print("\n📥 PAKISTAN UNDER SIEGE - IMAGE DOWNLOADER")
    print("=" * 50)
    print(f"Started at: {timestamp}")
    print("=" * 50)
    
    for image_name, image_url in IMAGES.items():
        # Create the full path for the image
        image_path = os.path.join(script_dir, image_name)
        
        # Download the image
        if download_image(image_url, image_path):
            success_count += 1
        else:
            failure_count += 1
    
    print("\n=" * 50)
    print(f"✅ Successfully downloaded: {success_count} images")
    print(f"❌ Failed downloads: {failure_count} images")
    print("=" * 50)
    
    # Write an attribution.txt file for legal compliance
    attribution_path = os.path.join(script_dir, "attribution.txt")
    with open(attribution_path, "w") as f:
        f.write("IMAGE ATTRIBUTIONS FOR PAKISTAN UNDER SIEGE WEBSITE\n")
        f.write("=" * 60 + "\n\n")
        f.write("All images are sourced from Wikimedia Commons and are free to use under their respective licenses.\n")
        f.write("This file was automatically generated on " + timestamp + "\n\n")
        
        for image_name, image_url in IMAGES.items():
            f.write(f"* {image_name}\n")
            f.write(f"  Source: {image_url}\n")
            f.write(f"  License: Please check the source link for specific license information\n\n")
    
    print(f"📄 Attribution file created: {attribution_path}")
    print("\nDone! You can now use these images in your website.\n")

if __name__ == "__main__":
    main()
