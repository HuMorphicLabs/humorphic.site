import logging
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Standardized REST API error response handler:
    {
        "status": "error",
        "error_type": "ValidationError",
        "message": "Human readable error description",
        "details": { ... }
    }
    """
    response = exception_handler(exc, context)

    if response is not None:
        custom_data = {
            'status': 'error',
            'error_type': exc.__class__.__name__,
            'status_code': response.status_code,
            'message': 'An error occurred during request processing.',
            'details': response.data
        }

        # If details has a detail message, bubble it up to message
        if isinstance(response.data, dict) and 'detail' in response.data:
            custom_data['message'] = str(response.data['detail'])
        elif isinstance(response.data, list) and len(response.data) > 0:
            custom_data['message'] = str(response.data[0])

        response.data = custom_data
    else:
        # Unhandled 500 internal server error
        logger.error(f"Unhandled exception in API context {context}: {exc}", exc_info=True)
        response = Response(
            {
                'status': 'error',
                'error_type': 'InternalServerError',
                'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An unexpected server error occurred.',
                'details': str(exc) if context.get('request') and context['request'].user.is_staff else None
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response
