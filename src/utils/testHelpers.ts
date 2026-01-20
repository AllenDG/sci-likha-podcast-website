// Test utilities for user acceptance testing
export const testIds = {
  // Audio Player
  audioPlayer: 'audio-player',
  playButton: 'play-button',
  pauseButton: 'pause-button',
  muteButton: 'mute-button',
  progressBar: 'progress-bar',
  
  // Episode Section
  episodeCard: 'episode-card',
  episodeTitle: 'episode-title',
  episodeDescription: 'episode-description',
  episodeThumbnail: 'episode-thumbnail',
  searchInput: 'episode-search',
  
  // Modal Player
  modalPlayer: 'modal-player',
  miniPlayer: 'mini-player',
  minimizeButton: 'minimize-button',
  closeButton: 'close-button',
  assessmentButton: 'assessment-button',
  
  // Navigation
  navbar: 'main-navbar',
  mobileMenuButton: 'mobile-menu-button',
  mobileMenu: 'mobile-menu',
  navLink: 'nav-link',
} as const;

export const accessibility = {
  // ARIA labels for screen readers
  labels: {
    playAudio: 'Play audio episode',
    pauseAudio: 'Pause audio episode',
    muteAudio: 'Mute audio',
    unmuteAudio: 'Unmute audio',
    seekAudio: 'Seek audio position',
    closePlayer: 'Close audio player',
    minimizePlayer: 'Minimize audio player',
    expandPlayer: 'Expand audio player',
    openAssessment: 'Open episode assessment',
    toggleMobileMenu: 'Toggle mobile navigation menu',
  },
  
  // Keyboard shortcuts
  shortcuts: {
    playPause: 'Space',
    mute: 'M',
    close: 'Escape',
    seek: 'Arrow keys',
  },
} as const;

export const testScenarios = {
  mobile: {
    audioPlayback: [
      'Audio should play on mobile devices',
      'Audio controls should be touch-friendly',
      'Progress bar should be seekable on touch',
      'Modal should be responsive on small screens',
      'Mini player should not overlap content',
    ],
    navigation: [
      'Mobile menu should toggle correctly',
      'Navigation links should be easily tappable',
      'Menu should close when link is selected',
      'Logo should remain visible on mobile',
    ],
    layout: [
      'Episode cards should stack vertically on mobile',
      'Images should scale properly',
      'Text should remain readable',
      'Buttons should be appropriately sized',
    ],
  },
  
  desktop: [
    'Audio should play without issues',
    'Keyboard navigation should work',
    'Modal should center properly',
    'Hover states should be visible',
    'Layout should use available space efficiently',
  ],
  
  accessibility: [
    'Screen readers should announce audio state',
    'All interactive elements should be keyboard accessible',
    'Focus indicators should be visible',
    'Color contrast should meet WCAG standards',
    'Audio controls should have proper ARIA labels',
  ],
  
  performance: [
    'Audio files should load efficiently',
    'Images should be lazy loaded',
    'Animations should be smooth',
    'No memory leaks in audio playback',
    'Responsive design should not cause layout shifts',
  ],
} as const;

// Helper function to simulate user interactions for testing
export const userActions = {
  playEpisode: (episodeId: number) => {
    const playButton = document.querySelector(`[data-testid="${testIds.playButton}-${episodeId}"]`) as HTMLButtonElement;
    playButton?.click();
  },
  
  togglePlayback: () => {
    const playPauseButton = document.querySelector(`[data-testid="${testIds.playButton}"], [data-testid="${testIds.pauseButton}"]`) as HTMLButtonElement;
    playPauseButton?.click();
  },
  
  seekAudio: (percentage: number) => {
    const progressBar = document.querySelector(`[data-testid="${testIds.progressBar}"]`) as HTMLElement;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = rect.left + (rect.width * percentage / 100);
      const clickEvent = new MouseEvent('click', {
        clientX: clickX,
        clientY: rect.top + rect.height / 2,
      });
      progressBar.dispatchEvent(clickEvent);
    }
  },
  
  toggleMobileMenu: () => {
    const menuButton = document.querySelector(`[data-testid="${testIds.mobileMenuButton}"]`) as HTMLButtonElement;
    menuButton?.click();
  },
  
  searchEpisodes: (query: string) => {
    const searchInput = document.querySelector(`[data-testid="${testIds.searchInput}"]`) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
};

// Validation helpers for testing
export const validators = {
  isAudioPlaying: (): boolean => {
    const audioElements = document.querySelectorAll('audio');
    return Array.from(audioElements).some(audio => !audio.paused);
  },
  
  isMobileMenuOpen: (): boolean => {
    const mobileMenu = document.querySelector(`[data-testid="${testIds.mobileMenu}"]`);
    return mobileMenu?.getAttribute('aria-expanded') === 'true';
  },
  
  isModalPlayerVisible: (): boolean => {
    const modalPlayer = document.querySelector(`[data-testid="${testIds.modalPlayer}"]`);
    return modalPlayer !== null && !modalPlayer.classList.contains('hidden');
  },
  
  isMiniPlayerVisible: (): boolean => {
    const miniPlayer = document.querySelector(`[data-testid="${testIds.miniPlayer}"]`);
    return miniPlayer !== null && !miniPlayer.classList.contains('hidden');
  },
  
  getEpisodeCount: (): number => {
    return document.querySelectorAll(`[data-testid^="${testIds.episodeCard}"]`).length;
  },
  
  isResponsive: (): boolean => {
    const isMobile = window.innerWidth < 768;
    const mobileMenuButton = document.querySelector(`[data-testid="${testIds.mobileMenuButton}"]`);
    return isMobile ? mobileMenuButton !== null : mobileMenuButton === null;
  },
};