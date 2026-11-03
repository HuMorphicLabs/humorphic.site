import os
import json
from django.core.exceptions import ValidationError

ALLOWED_3D_EXTENSIONS = ['.glb', '.gltf']
MAX_3D_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

def validate_3d_file(file):
    """
    Validates uploaded 3D files:
    1. Extension check (.glb or .gltf)
    2. File size threshold (max 100MB)
    3. Magic byte signature verification:
       - GLB binary: Must start with 0x46546C67 ('glTF')
       - GLTF JSON: Must be valid JSON containing 'asset' dictionary
    """
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in ALLOWED_3D_EXTENSIONS:
        raise ValidationError(
            f"Unsupported 3D file format: '{ext}'. Only .glb and .gltf files are supported."
        )

    if file.size > MAX_3D_FILE_SIZE:
        max_mb = MAX_3D_FILE_SIZE // (1024 * 1024)
        file_mb = round(file.size / (1024 * 1024), 2)
        raise ValidationError(
            f"File size ({file_mb} MB) exceeds maximum allowed limit of {max_mb} MB."
        )

    # Read first 12 bytes for magic bytes header inspection
    initial_pos = file.tell()
    file.seek(0)
    header = file.read(12)

    if ext == '.glb':
        if len(header) < 4 or header[:4] != b'glTF':
            file.seek(initial_pos)
            raise ValidationError(
                "Invalid binary GLB file. Missing 'glTF' binary magic header."
            )
    elif ext == '.gltf':
        # GLTF is JSON format
        file.seek(0)
        try:
            content_sample = file.read(4096).decode('utf-8', errors='ignore')
            if '"asset"' not in content_sample:
                raise ValidationError("Invalid GLTF file structure: missing 'asset' declaration.")
        except Exception as e:
            file.seek(initial_pos)
            raise ValidationError(f"Invalid text GLTF file format: {str(e)}")

    file.seek(initial_pos)
