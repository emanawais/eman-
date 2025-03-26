/**
 * Supervisor Data Service Module
 * Handles all supervisor-related operations including filtering, bookmarking, and data management
 */

// Constants
const STORAGE_KEY = 'fyp_supervisor_bookmarks';
const MIN_SLOTS_DEFAULT = 0;
const MAX_SLOTS_DEFAULT = Infinity;

/**
 * Supervisor Filter Service
 */
export const SupervisorFilter = {
  /**
   * Filter supervisors by multiple criteria
   * @param {Array} supervisors - Array of supervisor objects
   * @param {Object} filters - Filter criteria
   * @param {string} [filters.domain] - Research domain to filter by
   * @param {number} [filters.minSlots=0] - Minimum available slots required
   * @param {number} [filters.maxSlots=Infinity] - Maximum available slots
   * @param {string} [filters.searchQuery] - General search query
   * @returns {Array} Filtered array of supervisors
   */
  filter(supervisors, { domain, minSlots = MIN_SLOTS_DEFAULT, maxSlots = MAX_SLOTS_DEFAULT, searchQuery = '' }) {
    if (!Array.isArray(supervisors)) {
      console.error('Supervisors must be an array');
      return [];
    }

    const searchTerm = searchQuery.toLowerCase();
    
    return supervisors.filter(supervisor => {
      // Domain filter
      const domainMatch = !domain || 
        supervisor.researchDomain.toLowerCase().includes(domain.toLowerCase());
      
      // Slots filter
      const slotsMatch = supervisor.availableSlots >= minSlots && 
                         supervisor.availableSlots <= maxSlots;
      
      // Search filter
      const searchMatch = !searchTerm || 
        Object.entries(supervisor).some(([key, value]) => {
          // Skip non-searchable fields
          if (key === 'profileImage' || key === 'contactInfo' || key === 'isAvailable') {
            return false;
          }
          
          // Handle nested objects
          if (typeof value === 'object' && value !== null) {
            return Object.values(value).some(
              nestedValue => typeof nestedValue === 'string' && 
                           nestedValue.toLowerCase().includes(searchTerm)
            );
          }
          
          // Handle string values
          return typeof value === 'string' && 
                 value.toLowerCase().includes(searchTerm);
        });

      return domainMatch && slotsMatch && searchMatch;
    });
  },

  /**
   * Sort supervisors by different criteria
   * @param {Array} supervisors - Array of supervisor objects
   * @param {string} sortBy - Sort criteria ('name', 'slots', 'rating')
   * @param {string} [direction='asc'] - Sort direction ('asc' or 'desc')
   * @returns {Array} Sorted array of supervisors
   */
  sort(supervisors, sortBy = 'name', direction = 'asc') {
    if (!Array.isArray(supervisors)) return [];
    
    const sortFunctions = {
      name: (a, b) => a.name.localeCompare(b.name),
      slots: (a, b) => a.availableSlots - b.availableSlots,
      rating: (a, b) => a.rating - b.rating
    };

    const sortFn = sortFunctions[sortBy] || sortFunctions.name;
    const sorted = [...supervisors].sort(sortFn);
    
    return direction === 'desc' ? sorted.reverse() : sorted;
  }
};

/**
 * Bookmark Service
 */
export const BookmarkService = {
  /**
   * Get all bookmarked supervisors
   * @returns {Array} Array of bookmarked supervisor IDs
   */
  getAll() {
    try {
      const bookmarks = localStorage.getItem(STORAGE_KEY);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Error reading bookmarks:', error);
      return [];
    }
  },

  /**
   * Add a supervisor to bookmarks
   * @param {Object} supervisor - Supervisor object to bookmark
   * @returns {boolean} True if successful, false otherwise
   */
  add(supervisor) {
    if (!supervisor?.id) {
      console.error('Invalid supervisor object');
      return false;
    }

    try {
      const bookmarks = this.getAll();
      
      // Store only essential data to minimize storage
      const supervisorData = {
        id: supervisor.id,
        name: supervisor.name,
        researchDomain: supervisor.researchDomain,
        availableSlots: supervisor.availableSlots,
        rating: supervisor.rating,
        profileImage: supervisor.profileImage,
        contactInfo: supervisor.contactInfo?.email || supervisor.contactInfo
      };
      
      if (!bookmarks.some(item => item.id === supervisor.id)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarks, supervisorData]));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving bookmark:', error);
      return false;
    }
  },

  /**
   * Remove a supervisor from bookmarks
   * @param {string} id - Supervisor ID to remove
   * @returns {boolean} True if removed, false otherwise
   */
  remove(id) {
    try {
      const bookmarks = this.getAll();
      const updatedBookmarks = bookmarks.filter(item => item.id !== id);
      
      if (updatedBookmarks.length !== bookmarks.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookmarks));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      return false;
    }
  },

  /**
   * Check if a supervisor is bookmarked
   * @param {string} id - Supervisor ID to check
   * @returns {boolean} True if bookmarked, false otherwise
   */
  isBookmarked(id) {
    const bookmarks = this.getAll();
    return bookmarks.some(item => item.id === id);
  },

  /**
   * Toggle bookmark status for a supervisor
   * @param {Object} supervisor - Supervisor object
   * @returns {boolean} New bookmark status (true if bookmarked after toggle)
   */
  toggle(supervisor) {
    return this.isBookmarked(supervisor.id) 
      ? !this.remove(supervisor.id)
      : this.add(supervisor);
  }
};