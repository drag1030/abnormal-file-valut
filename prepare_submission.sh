#!/bin/bash

# Clean up heavy, unnecessary folders from frontend
echo "Removing frontend node_modules and build..."
rm -rf frontend/node_modules frontend/build frontend/.cache

# Clean up backend virtual environment, data, staticfiles, media, __pycache__
echo "Removing backend Python venv, media, data, staticfiles, __pycache__..."
rm -rf backend/venv backend/.venv backend/staticfiles backend/media backend/data
find backend -name "__pycache__" -type d -exec rm -rf {} +
find backend -name "*.pyc" -delete

# Remove other hidden/system files
echo "Removing .DS_Store, .log and other temp files..."
find . -name ".DS_Store" -delete
find . -name "*.log" -delete

echo "Cleanup complete! Ready to zip your project."

# Optional: print recommendation to check with 'du -sh .'
echo ""
echo "Run 'du -sh .' to verify your folder size."
echo "Now you can zip your cleaned project folder."
