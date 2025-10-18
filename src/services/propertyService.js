import axios from '@/libs/axios';

export const propertyService = {
  /**
   * Transform property data from new API structure to match existing UI expectations
   * @param {Object} property - Property object from new API
   * @returns {Object} Transformed property object
   */
  transformPropertyData(property) {
    return {
      ...property,
      // Transform nested amenities to flat properties for backward compatibility
      bedrooms: property.amenities?.bedroom || 0,
      bathrooms: property.amenities?.bathroom || 0,
      area: property.amenities?.area || 0,
      // Use first image as main image for backward compatibility
      image: property.images?.[0] || null,
      // Keep original amenities object for new features
      amenities: property.amenities || {},
      images: property.images || []
    };
  },

  /**
   * Transform array of properties from new API structure
   * @param {Array} properties - Array of property objects from new API
   * @returns {Array} Array of transformed property objects
   */
  transformPropertiesData(properties) {
    return properties.map(property => this.transformPropertyData(property));
  },

  /**
   * Fetch all properties for the logged-in agent
   * @returns {Promise} Promise object containing the properties data
   */
  async fetchAgentProperties() {
    try {
      const response = await axios.get('/api/agents/properties');
      // Handle new response structure with data wrapper
      const properties = response.data.data || response.data;
      return {
        ...response.data,
        data: this.transformPropertiesData(properties)
      };
    } catch (error) {
      console.error('Error fetching agent properties:', error);
      throw error;
    }
  },

  /**
   * Fetch a single property by ID
   * @param {number} propertyId - The ID of the property to fetch
   * @returns {Promise} Promise object containing the property data
   */
  async fetchPropertyById(propertyId) {
    try {
      const response = await axios.get(`/api/agents/properties/${propertyId}`);
      // Transform single property data
      const transformedProperty = this.transformPropertyData(response.data);
      return transformedProperty;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  },
};