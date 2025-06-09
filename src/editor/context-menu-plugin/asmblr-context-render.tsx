import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import type { Item } from './context-menu-plugin/types';

export function renderContextMenu(element: HTMLElement, props: Props) {
  const root = ReactDOM.createRoot(element);
  root.render(<AsmblrContextMenu {...props} onUnmount={() => root.unmount()} />);
}

type Props = {
  items: Item[];
  onHide: () => void;
  onUnmount: () => void;
  searchBar?: boolean;
};

function AsmblrContextMenu({ items, onHide, onUnmount, searchBar }: Props) {
  const [query, setQuery] = useState('');
  const menuRefs = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = query
    ? flattenItems(items).filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const isInside = menuRefs.current.some((el) => el?.contains(e.target as Node));
      if (!isInside) {
        onHide();
        onUnmount();
        setIsVisible(false); // switches class
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [onHide, onUnmount]);

  const registerMenuRef = (el: HTMLElement | null) => {
    if (el && !menuRefs.current.includes(el)) {
      menuRefs.current.push(el);
    }
  };

  return (
    <div ref={containerRef} 
    className={isVisible ? 'asmblr-context-menu' : 'asmblr-context-menu-closed'}
    style={{ position: 'absolute' }}>
      {searchBar && (
        <input
          type="text"
          placeholder="Search..."
          className="asmblr-context-menu-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
        />
      )}
      {filteredItems.map((item) => (
        <MenuItem key={item.key} item={item} onHide={onHide} registerMenuRef={registerMenuRef} />
      ))}
    </div>
  );
}

function MenuItem({ item, onHide, registerMenuRef }: { item: Item; onHide: () => void; registerMenuRef: (el: HTMLElement | null) => void }) {
  const [subVisible, setSubVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const [submenuPos, setSubmenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (subVisible && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setSubmenuPos({ top: rect.top, left: rect.right });
    }
  }, [subVisible]);

  return (
    <div
      ref={itemRef}
      className="asmblr-context-menu-item"
      onMouseEnter={() => setSubVisible(true)}
      onMouseLeave={() => setSubVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (!item.subitems) {
          item.handler?.();
          onHide();
        }
      }}
    >
      {item.label}
      {item.subitems && subVisible && (
        <div
          className="asmblr-context-submenu"
          ref={registerMenuRef}
          style={{ position: 'fixed', top: submenuPos.top, left: submenuPos.left }}
        >
          {item.subitems.map((sub) => (
            <MenuItem key={sub.key} item={sub} onHide={onHide} registerMenuRef={registerMenuRef} />
          ))}
        </div>
      )}
    </div>
  );
}

function flattenItems(items: Item[], path: string[] = []): Item[] {
  return items.flatMap((item, index) => {
    const fullKey = [...path, String(item.key ?? index)].join('/');

    const newItem = { ...item, key: fullKey };

    return item.subitems
      ? [newItem, ...flattenItems(item.subitems, [...path, String(item.key ?? index)])]
      : [newItem];
  });
}