/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { useFloating, autoUpdate, offset, flip, shift, size } from '@floating-ui/react-dom';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useGlobalSearch, useGlobalCurrentPlaceInfo } from '../../stores/globalStore';
import type { SuggestionItem } from '../../types/SuggestionItem';
import weatherFetch from '../../utils/weatherFetch';
import type { WeatherApiForecastResponse } from '../../types/WeatherApiForecastResponse';

function SearchBar(): JSX.Element {
  const [search, setSearch] = useGlobalSearch();
  const [, setCurrentPlaceInfo] = useGlobalCurrentPlaceInfo();
  const [searchDebounced] = useDebounceValue(search, 500);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    middleware: [
      offset(10),
      flip(),
      shift(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight, 200)}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useOnClickOutside(refs.floating, (event) => {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.parentNode !== refs.reference.current) {
      setIsOpen(false);
    }
  });

  const handleUpdateCurrentPlaceInfo = async (searchString: string): Promise<void> => {
    const res = await weatherFetch(`/forecast.json?q=${searchString}&days=1`);
    if (res.ok) {
      const data = (await res.json()) as WeatherApiForecastResponse;
      setCurrentPlaceInfo(data);
      setSearch('');
    } else {
      toast(`${res.status} ${await res.text()}`, { type: 'error' });
    }
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleUpdateCurrentPlaceInfo(search);
      setIsOpen(false);
    }
  };

  const handleSetSuggestion = (suggestion: SuggestionItem): void => {
    handleUpdateCurrentPlaceInfo(suggestion.url);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchDebounced) {
      setIsOpen(true);
      const abortController = new AbortController();
      (async () => {
        try {
          setIsLoading(true);
          const res = await weatherFetch(`/search.json?q=${searchDebounced}`, {
            signal: abortController.signal,
          });
          if (res.ok) {
            const data = (await res.json()) as SuggestionItem[];
            setSuggestions(data);
          } else {
            toast(`${res.status} ${await res.text()}`, { type: 'error' });
          }
          setIsLoading(false);
        } catch (error: unknown) {
          toast('fetch failed, cannot fetch weather search.json', { type: 'error' });
        }
      })();
      return () => {
        abortController.abort();
      };
    }
    setSuggestions([]);
  }, [searchDebounced]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div ref={refs.setReference} style={{ display: 'flex', gap: '10px' }}>
        <Input
          value={search}
          // onFocus={() => setIsOpen(true)}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for places..."
          onKeyDown={handleKeyboard}
          style={{ flexGrow: 1 }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => handleUpdateCurrentPlaceInfo(search)}
        />
        <Button type="primary" danger onClick={() => setSearch('')} icon={<ClearOutlined />} />
      </div>
      <div
        ref={refs.setFloating}
        className={clsx('search-bar-floating', isOpen && 'open')}
        style={floatingStyles}
      >
        {isLoading && <div className="search-bar-floating-message">Loading...</div>}
        {!isLoading && (
          <>
            {searchDebounced.length === 0 && (
              <div className="search-bar-floating-message">Type something</div>
            )}
            {searchDebounced.length !== 0 && suggestions.length === 0 && (
              <div className="search-bar-floating-message">Nothing found</div>
            )}
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSetSuggestion(suggestion)}
                className="search-bar-floating-list-item"
              >
                <div>Name: {suggestion.name}</div>
                <div>Country: {suggestion.country}</div>
                <div>Region: {suggestion.region}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
