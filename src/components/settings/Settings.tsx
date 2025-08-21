import getSettingsSections from '@app/components/settings/helper/getSettingsSections.ts';
import Section from '@app/components/settings/ui/Section.tsx';
import UI from '@app/components/ui/index.ts';
import appStore from '@app/store/appStore.ts';
import type { Component, GroupProps, SectionProps } from '@app/types/settingSchema.ts';
import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    document.body.classList.add('settings-open');

    const initialSections = getSettingsSections();
    setSections(initialSections);
    setLoading(false);

    const unsubscribe = appStore.subscribe((state) => {
      const updatedSections = getSettingsSections(state);
      setSections(updatedSections);
    });
    return () => {
      document.body.classList.remove('settings-open');
      unsubscribe();
    };
  }, []);

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  useEffect(() => {
    setFiltering(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setFiltering(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory]);

  const lowerSearch = debouncedQuery.toLowerCase();

  const filteredSections = sections
    .filter((section) => section.sectionName === selectedCategory || selectedCategory === 'All')
    .map((section) => {
      const filteredGroups = section.groups
        .map((group) => {
          const filteredComponents = group.components.filter((comp: Component) =>
            comp.label.toLowerCase().includes(lowerSearch)
          );
          if (filteredComponents.length === 0) return null;
          return { ...group, components: filteredComponents };
        })
        .filter(Boolean) as GroupProps[];

      if (filteredGroups.length === 0) return null;
      return { ...section, groups: filteredGroups };
    })
    .filter(Boolean) as SectionProps[];

  const categories = ['All', ...sections.map((s) => s.sectionName)];

  return (
    <div className="glassify-settings">
      <div className="search-wrapper">
        <div className="section-card encore-text encore-text-body-small encore-internal-color-text-base">
          <UI.Carousel
            categories={categories}
            defaultIndex={0}
            onCategorySelect={(label) => setSelectedCategory(label)}
          />
          <UI.Input
            inputType="text"
            onChange={setSearchQuery}
            value={searchQuery}
            placeholder="Search settings..."
          />
        </div>
      </div>

      {loading || filtering ? (
        <div className="loader-wrapper">
          <UI.Loader />
        </div>
      ) : filteredSections.length === 0 ? (
        <div className="section-card encore-text encore-text-body-small encore-internal-color-text-base">
          <p className="encore-text glassify-error-text">No settings found.</p>
        </div>
      ) : (
        filteredSections.map((section) => <Section key={section.id} {...section} />)
      )}
    </div>
  );
};

export default Settings;
