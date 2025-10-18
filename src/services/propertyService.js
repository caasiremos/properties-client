import axios from '@/libs/axios';

export const propertyService = {
  /**
   * Fetch all properties for the logged-in agent
   * @returns {Promise} Promise object containing the properties data
   */
  async fetchAgentProperties() {
    try {
      const response = await axios.get('/api/agents/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching agent properties:', error);
      throw error;
    }
  },

  /**
   * Transform API response data to match component expected format
   * @param {Array} apiProperties - Properties from API response
   * @returns {Array} Transformed properties data
   */
  transformPropertiesData(apiProperties) {
    return apiProperties.map(property => {
      // Parse amenities JSON string
      let amenities = [];
      try {
        const parsedAmenities = typeof property.amenities === 'string'
          ? JSON.parse(property.amenities)
          : property.amenities;

        // Convert amenities object to array of amenity names
        amenities = Object.entries(parsedAmenities)
          .filter(([key, value]) => value === true || typeof value === 'number')
          .map(([key]) => {
            // Convert snake_case to Title Case
            return key.split('_').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          });
      } catch (error) {
        console.warn('Error parsing amenities:', error);
      }

      // Extract bedroom and bathroom counts from amenities
      let bedrooms = 0;
      let bathrooms = 0;
      let area = 0;

      try {
        const parsedAmenities = typeof property.amenities === 'string'
          ? JSON.parse(property.amenities)
          : property.amenities;

        bedrooms = parsedAmenities.bedroom || 0;
        bathrooms = parsedAmenities.bathroom || 0;
        area = parsedAmenities.area || 0;
      } catch (error) {
        console.warn('Error parsing room counts:', error);
      }

      return {
        id: property.id,
        title: property.title,
        price: parseFloat(property.price) || 0,
        type: property.type,
        status: property.status?.toLowerCase() || 'available',
        location: property.location,
        description: property.description,
        image: property.images && property.images.length > 0 ? property.images[0] : '/placeholder-property.jpg',
        images: property.images || [],
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        area: area,
        amenities: amenities,
        created_at: property.created_at,
        updated_at: property.updated_at
      };
    });
  }
};