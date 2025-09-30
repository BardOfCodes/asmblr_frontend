/**
 * Custom Notification System
 * 
 * Provides a clean interface for showing success messages, error dialogs,
 * and informational notifications to users using custom DOM elements.
 */

import { debug } from './debug';

export interface NotificationOptions {
  duration?: number; // in seconds, 0 for persistent
}

export interface ErrorDialogOptions {
  title?: string;
  message: string;
  traceback?: string;
  type?: string;
}

class NotificationManager {
  private notificationContainer: HTMLElement | null = null;

  constructor() {
    this.createNotificationContainer();
  }

  private createNotificationContainer(): void {
    if (this.notificationContainer) return;
    
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.id = 'notification-container';
    this.notificationContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(this.notificationContainer);
  }

  private createNotification(content: string, type: 'success' | 'info' | 'warning' | 'error', duration: number): void {
    if (!this.notificationContainer) return;

    const notification = document.createElement('div');
    notification.style.cssText = `
      background: ${this.getBackgroundColor(type)};
      color: ${this.getTextColor(type)};
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-left: 4px solid ${this.getBorderColor(type)};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      max-width: 320px;
      word-wrap: break-word;
      pointer-events: auto;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateX(100%);
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 8px; font-size: 16px;">${this.getIcon(type)}</span>
        <span>${content}</span>
      </div>
    `;

    // Add click to dismiss
    notification.onclick = () => this.removeNotification(notification);

    this.notificationContainer.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration * 1000);
    }
  }

  private removeNotification(notification: HTMLElement): void {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  private getBackgroundColor(type: string): string {
    switch (type) {
      case 'success': return '#f6ffed';
      case 'info': return '#e6f7ff';
      case 'warning': return '#fffbe6';
      case 'error': return '#fff2f0';
      default: return '#ffffff';
    }
  }

  private getTextColor(type: string): string {
    switch (type) {
      case 'success': return '#389e0d';
      case 'info': return '#1890ff';
      case 'warning': return '#d48806';
      case 'error': return '#cf1322';
      default: return '#000000';
    }
  }

  private getBorderColor(type: string): string {
    switch (type) {
      case 'success': return '#52c41a';
      case 'info': return '#1890ff';
      case 'warning': return '#faad14';
      case 'error': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  }

  private getIcon(type: string): string {
    switch (type) {
      case 'success': return '●';
      case 'info': return '●';
      case 'warning': return '●';
      case 'error': return '●';
      default: return '●';
    }
  }

  /**
   * Show success notification
   */
  success(content: string, options: NotificationOptions = {}): void {
    const duration = options.duration !== undefined ? options.duration : 3;
    debug.log(`[Notifications] Success: ${content}`);
    this.createNotification(content, 'success', duration);
  }

  /**
   * Show info notification
   */
  info(content: string, options: NotificationOptions = {}): void {
    const duration = options.duration !== undefined ? options.duration : 3;
    debug.log(`[Notifications] Info: ${content}`);
    this.createNotification(content, 'info', duration);
  }

  /**
   * Show warning notification
   */
  warning(content: string, options: NotificationOptions = {}): void {
    const duration = options.duration !== undefined ? options.duration : 4;
    debug.log(`[Notifications] Warning: ${content}`);
    this.createNotification(content, 'warning', duration);
  }

  /**
   * Show error notification
   */
  error(content: string, options: NotificationOptions = {}): void {
    const duration = options.duration !== undefined ? options.duration : 5;
    debug.log(`[Notifications] Error: ${content}`);
    this.createNotification(content, 'error', duration);
  }

  /**
   * Show detailed error dialog with traceback
   */
  showErrorDialog(options: ErrorDialogOptions): void {
    debug.error('[Notifications] Showing error dialog:', options);
    
    const title = options.title || `${options.type || 'Error'} Occurred`;
    const traceback = options.traceback || '';

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 32px;
      max-width: 800px;
      width: 90vw;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;

    let modalContent = `
      <div style="margin-bottom: 20px;">
        <h2 style="margin: 0; color: #cf1322; font-size: 20px; font-weight: 600;">${title}</h2>
      </div>
      <p style="margin: 0 0 16px 0; color: #374151; line-height: 1.5;">
        ${options.message}
      </p>
    `;

    if (traceback) {
      modalContent += `
        <details style="margin-bottom: 16px;">
          <summary style="
            cursor: pointer;
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 8px;
            user-select: none;
            padding: 8px;
            background: #f9fafb;
            border-radius: 4px;
          ">
            Show Technical Details
          </summary>
          <pre style="
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            padding: 12px;
            font-size: 12px;
            color: #374151;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
            max-height: 300px;
            overflow: auto;
            font-family: 'Courier New', Consolas, monospace;
            margin: 8px 0 0 0;
          ">${traceback}</pre>
        </details>
      `;
    }

    modalContent += `
      <div style="text-align: right;">
        <button id="close-error-dialog" style="
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        ">Close</button>
      </div>
    `;

    modal.innerHTML = modalContent;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
      overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    }, 10);

    // Close handlers
    const closeModal = () => {
      overlay.style.opacity = '0';
      modal.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
      }, 300);
    };

    // Close on button click
    const closeButton = modal.querySelector('#close-error-dialog');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Close on ESC key
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
  }
}

// Export singleton instance
export const notifications = new NotificationManager();

/**
 * Process API messages and show appropriate notifications
 */
export function processAPIMessages(messages: string[]): void {
  messages.forEach(msg => {
    notifications.info(msg, { duration: 3 });
  });
}

/**
 * Process API error and show error dialog
 */
export function processAPIError(error: { message: string; traceback?: string; type?: string }): void {
  notifications.showErrorDialog({
    title: `${error.type || 'API Error'}`,
    message: error.message,
    traceback: error.traceback,
    type: error.type
  });
}