import { supervisors, researchDomains } from "./data.js";
import { SupervisorFilter, BookmarkService } from "./supervisorService.js";

class SupervisorApp {
  constructor() {
    this.elements = {};
    this.state = {
      allSupervisors: [],
      filteredSupervisors: [],
      currentFilters: {},
      sortCriteria: 'name',
      sortDirection: 'asc'
    };

    this.init = this.init.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleSearchInput = this.debounce(this.handleSearchInput.bind(this), 300);

    document.addEventListener("DOMContentLoaded", this.init);
  }

  async init() {
    this.cacheElements();
    this.populateDomainFilter();
    this.setupEventListeners();
    await this.loadData();
    this.applyFilters();
    this.displayBookmarkedSupervisors();
  }

  cacheElements() {
    this.elements = {
      supervisorList: document.getElementById("supervisor-list"),
      bookmarkedList: document.getElementById("bookmarked-list"),
      loading: document.getElementById("loading"),
      filterButton: document.getElementById("apply-filters"),
      resetButton: document.getElementById("reset-filters"),
      domainFilter: document.getElementById("domain-filter"),
      availabilityFilter: document.getElementById("availability-filter"),
      sortSelect: document.getElementById("sort-by"),
      searchInput: document.getElementById("search"),
      resultsCount: document.getElementById("results-count"),
      viewAllBookmarks: document.getElementById("view-all-bookmarks"),
      emptyBookmarks: document.getElementById("empty-bookmarks")
    };
  }

  populateDomainFilter() {
    const select = this.elements.domainFilter;
    if (!select) return;
    
    select.innerHTML = '<option value="">All Domains</option>' + 
      researchDomains.map(domain => 
        `<option value="${domain.toLowerCase().replace(/\s+/g, '-')}">${domain}</option>`
      ).join('');
  }

  async loadData() {
    this.showLoading();
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate and filter supervisors data
      this.state.allSupervisors = supervisors.filter(supervisor => 
        supervisor.id && supervisor.name && supervisor.researchDomain
      );
      
      this.state.filteredSupervisors = [...this.state.allSupervisors];
      this.renderSupervisors();
      this.updateResultsCount();
    } catch (error) {
      console.error("Error loading data:", error);
      this.showError("Failed to load supervisor data");
    } finally {
      this.hideLoading();
    }
  }

  setupEventListeners() {
    const { 
      filterButton, resetButton, sortSelect, 
      searchInput, viewAllBookmarks, supervisorList 
    } = this.elements;

    filterButton?.addEventListener("click", this.applyFilters);
    resetButton?.addEventListener("click", this.resetFilters);
    sortSelect?.addEventListener("change", (e) => {
      this.state.sortCriteria = e.target.value;
      this.applyFilters();
    });
    searchInput?.addEventListener("input", this.handleSearchInput);
    viewAllBookmarks?.addEventListener("click", () => {
      this.resetFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Event delegation for bookmark buttons
    supervisorList?.addEventListener("click", (e) => {
      if (e.target.classList.contains("bookmark-button")) {
        this.handleBookmarkClick(e);
      }
    });
  }

  handleSearchInput(e) {
    this.state.currentFilters.searchQuery = e.target.value;
    this.applyFilters();
  }

  applyFilters() {
    const domain = this.elements.domainFilter?.value || '';
    const availability = this.elements.availabilityFilter?.value || '';
    
    // Determine slot range based on availability
    const slotRanges = {
      high: { min: 5 },
      medium: { min: 2, max: 4 },
      low: { min: 0, max: 1 }
    };
    
    const slotsRange = availability ? slotRanges[availability] : { min: 0 };
    
    this.state.currentFilters = {
      domain,
      minSlots: slotsRange.min,
      maxSlots: slotsRange.max,
      searchQuery: this.state.currentFilters.searchQuery || ''
    };
    
    // Filter and sort
    this.state.filteredSupervisors = SupervisorFilter.filter(
      this.state.allSupervisors,
      this.state.currentFilters
    );
    
    this.state.filteredSupervisors = SupervisorFilter.sort(
      this.state.filteredSupervisors,
      this.state.sortCriteria,
      this.state.sortDirection
    );
    
    this.renderSupervisors();
    this.updateResultsCount();
  }

  resetFilters() {
    const { domainFilter, availabilityFilter, searchInput, sortSelect } = this.elements;
    
    if (domainFilter) domainFilter.value = "";
    if (availabilityFilter) availabilityFilter.value = "";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "name";
    
    this.state = {
      ...this.state,
      currentFilters: {},
      sortCriteria: 'name',
      filteredSupervisors: [...this.state.allSupervisors]
    };
    
    this.applyFilters();
  }

  renderSupervisors() {
    const { supervisorList } = this.elements;
    if (!supervisorList) return;
    
    if (this.state.filteredSupervisors.length === 0) {
      supervisorList.innerHTML = this.createEmptyState("No supervisors match your criteria");
      return;
    }
    
    supervisorList.innerHTML = this.state.filteredSupervisors
      .map(supervisor => this.createSupervisorCard(supervisor))
      .join("");
  }

  createSupervisorCard(supervisor) {
    const isBookmarked = BookmarkService.isBookmarked(supervisor.id);
    const contactEmail = supervisor.contactInfo?.email || supervisor.contactInfo;
    const slotsText = supervisor.availableSlots > 0 
      ? `${supervisor.availableSlots} slot${supervisor.availableSlots !== 1 ? 's' : ''} available`
      : 'No slots available';
    
    return `
      <article class="supervisor-card p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow card-hover">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <img src="${supervisor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(supervisor.name)}&background=4F46E5&color=fff`}" 
                 alt="Profile picture of ${supervisor.name}" 
                 class="w-12 h-12 rounded-full object-cover">
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 truncate">${supervisor.name}</h3>
            <p class="text-sm text-gray-500 mb-1">
              <i class="fas fa-graduation-cap mr-1" aria-hidden="true"></i>
              ${supervisor.researchDomain}
            </p>
            <div class="flex items-center space-x-4 text-sm">
              <span class="flex items-center ${supervisor.availableSlots > 0 ? 'text-gray-600' : 'text-red-600'}">
                <i class="fas fa-user-graduate mr-1" aria-hidden="true"></i>
                ${slotsText}
              </span>
              <span class="flex items-center text-yellow-600">
                <i class="fas fa-star mr-1" aria-hidden="true"></i>
                ${supervisor.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <a href="mailto:${contactEmail}" class="text-blue-600 hover:text-blue-800 text-sm">
            <i class="fas fa-envelope mr-1" aria-hidden="true"></i> Contact
          </a>
          <button data-id="${supervisor.id}" 
                  class="bookmark-button px-4 py-2 rounded-lg text-sm font-medium 
                         ${isBookmarked ? 'bg-gray-200 text-gray-800' : 'bg-blue-100 text-blue-800'}
                         hover:bg-blue-200 transition-colors"
                  aria-label="${isBookmarked ? 'Remove bookmark' : 'Bookmark this supervisor'}">
            ${isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </article>
    `;
  }

  displayBookmarkedSupervisors() {
    const { bookmarkedList, emptyBookmarks } = this.elements;
    if (!bookmarkedList || !emptyBookmarks) return;
    
    const bookmarked = BookmarkService.getAll();
    
    if (bookmarked.length === 0) {
      bookmarkedList.innerHTML = '';
      emptyBookmarks.classList.remove('hidden');
      return;
    }
    
    emptyBookmarks.classList.add('hidden');
    bookmarkedList.innerHTML = bookmarked
      .map(supervisor => this.createSupervisorCard(supervisor))
      .join("");
  }

  handleBookmarkClick(event) {
    const supervisorId = event.target.getAttribute("data-id");
    const supervisor = this.state.allSupervisors.find(s => s.id === supervisorId);
    
    if (!supervisor) return;
    
    const isNowBookmarked = BookmarkService.toggle(supervisor);
    
    // Update button state
    event.target.textContent = isNowBookmarked ? 'Bookmarked' : 'Bookmark';
    event.target.classList.toggle('bg-gray-200', isNowBookmarked);
    event.target.classList.toggle('bg-blue-100', !isNowBookmarked);
    event.target.classList.toggle('text-gray-800', isNowBookmarked);
    event.target.classList.toggle('text-blue-800', !isNowBookmarked);
    event.target.setAttribute('aria-label', 
      isNowBookmarked ? 'Remove bookmark' : 'Bookmark this supervisor');
    
    this.displayBookmarkedSupervisors();
  }

  createEmptyState(message) {
    return `
      <div class="empty-state p-8 text-center text-gray-500 col-span-full">
        <i class="fas fa-user-slash text-4xl mb-3" aria-hidden="true"></i>
        <p>${message}</p>
        <button class="reset-btn mt-3 text-blue-600 hover:text-blue-800">
          Reset filters
        </button>
      </div>
    `;
  }

  updateResultsCount() {
    const { resultsCount } = this.elements;
    if (!resultsCount) return;
    
    const count = this.state.filteredSupervisors.length;
    const total = this.state.allSupervisors.length;
    resultsCount.textContent = `Showing ${count} of ${total} ${total === 1 ? 'result' : 'results'}`;
  }

  showLoading() {
    this.elements.loading?.classList.remove("hidden");
    this.elements.supervisorList?.classList.add("hidden");
  }

  hideLoading() {
    this.elements.loading?.classList.add("hidden");
    this.elements.supervisorList?.classList.remove("hidden");
  }

  showError(message) {
    const { supervisorList } = this.elements;
    if (!supervisorList) return;
    
    supervisorList.innerHTML = this.createEmptyState(message);
  }

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
}

// Initialize the app
new SupervisorApp();