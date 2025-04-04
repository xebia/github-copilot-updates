import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import PoweredBy from '../PoweredBy';

const Index = () => {
  const [feeds, setFeeds] = useState([]);
  const [feedCounts, setFeedCounts] = useState({});
  const [totalItemCount, setTotalItemCount] = useState(0);

  const REACT_APP_NODE_ENV = "unknown";
  const buildNumber = import.meta.env.REACT_APP_BUILDNUMBER || 'unknown';

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch('data.json');
        const data = await response.json();
        setFeeds(data.rssFeeds.feeds);
        mergeManualUrls(data.manualUrls);
      } catch (error) {
        console.error('Error loading the data:', error);
      }
    };

    fetchFeeds();
  }, []);

  const mergeManualUrls = (manualUrls) => {
    const uniqueItems = new Map();
  
    manualUrls.forEach(manualUrl => {
      uniqueItems.set(manualUrl.title, {
        title: manualUrl.title,
        description: `<a href="${manualUrl.url}" target="_blank">${manualUrl.url}</a>`,
        pubDate: new Date(manualUrl.dateAdded).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        feeds: ['Other']
      });
    });
  
    setUniqueItems(prevItems => {
      const mergedItems = new Map(prevItems);
      uniqueItems.forEach((value, key) => {
        mergedItems.set(key, value);
      });
      return mergedItems;
    });
  
    setFeedCounts(prevCounts => ({
      ...prevCounts,
      Other: manualUrls.length
    }));
  };

  const fetchRSSItems = async () => {
  	const proxyUrl = 'https://corsproxy.io/?url=';
    const counts = { Other: feedCounts.Other || 0 }; // Initialize with manualUrls count
    let totalItems = counts.Other; // Start with manualUrls count
    const uniqueItems = new Map();
  
    for (const feed of feeds) {
      try {
        let response;
        if (feed.cors) {
          response = await fetch(proxyUrl + encodeURIComponent(feed.url)).then(res => res.text());
        } else {
          response = await fetch(feed.url).then(res => res.text());
        }
        const data = new window.DOMParser().parseFromString(response, "text/xml");
        const items = data.querySelectorAll("item");
        counts[feed.name] = items.length;
        totalItems += items.length;
  
        items.forEach(item => {
          const title = item.querySelector("title").textContent;
          const description = item.querySelector("description").textContent;
          const pubDate = new Date(item.querySelector("pubDate").textContent);
          const formattedDate = pubDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  
          if (uniqueItems.has(title)) {
            uniqueItems.get(title).feeds.push(feed.name);
          } else {
            uniqueItems.set(title, {
              description,
              pubDate: formattedDate,
              feeds: [feed.name]
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching feed ${feed.name}:`, error);
      }
    }
  
    setFeedCounts(counts);
    setTotalItemCount(totalItems);
    setUniqueItems(uniqueItems);
  };

  useEffect(() => {
    if (feeds.length > 0) {
      fetchRSSItems();
    }
  }, [feeds]);

  const [uniqueItems, setUniqueItems] = useState(new Map());

  useEffect(() => {
    const sortedItems = Array.from(uniqueItems.entries()).sort((a, b) => new Date(b[1].pubDate) - new Date(a[1].pubDate));
    sortedItems.forEach(([title, value]) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <h4>${title}</h4>
        <p>${value.description}</p>
        ${value.feeds.map(feed => `<span>${feed}</span>`).join('')}
        <span class="date">Published: ${value.pubDate}</span>
      `;
      document.getElementById('news-content').appendChild(newsItem);
    });
  }, [uniqueItems]);

  const unselectFiltersAndShowAll = () => {
    document.querySelectorAll('.news-item').forEach(item => {
      item.style.display = '';
    });
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.classList.remove('active');
    });
  };

  const filterNews = (feedName, clickedButton) => {
    const newsItems = document.querySelectorAll('.news-item');
    const isActive = clickedButton.classList.contains('active');
    clickedButton.classList.toggle('active');

    if (isActive) {
      newsItems.forEach(item => {
        item.style.display = '';
      });
    } else {
      newsItems.forEach(item => {
        if (feedName === 'Other') {
          if (item.querySelector('span').textContent === 'Other') {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        } else {
          if (item.querySelector('span').textContent === feedName) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        }
      });
    }

    document.querySelectorAll('.filter-btn').forEach(button => {
      if (button !== clickedButton) {
        button.classList.remove('active');
      }
    });
  };

  return (
    <div>
      <div className="grid-container">
        <div id="container" className="box-grid">
          <div className="box">
            <Link to="/skus">Copilot Feature Highlights</Link>
          </div>
          <div className="box">
            <Link to="/gamelandscape">Levels of Enlightenment</Link>
          </div>
          <div className="box">
            <Link to="/tutorials">Tutorials</Link>
          </div>
          <div className="box">
            <img src="copilot.jfif" alt="Logo of a pilot with a headset and a leather jacket" style={{ width: '100px', height: 'auto' }} />
            <PoweredBy />
          </div>
        </div>
      </div>

      <div id="copilot-news">
        <h2>Copilot News</h2>
        <div id="filter-buttons">
          <button className="filter-btn" onClick={unselectFiltersAndShowAll}>All ({totalItemCount})</button>
          {
            feeds.map(feed => (
              <button
                key={feed.name}
                className="filter-btn"
                data-feed-name={feed.name}
                onClick={(e) => filterNews(feed.name, e.target)}
              >
                {feed.name} ({feedCounts[feed.name] || 0})
              </button>
            ))
          }
          <button
            className="filter-btn"
            data-feed-name="Other"
            onClick={(e) => filterNews('Other', e.target)}
          >
            Other ({feedCounts.Other || 0})
          </button>
        </div>

        <div id="news-content"></div>
      </div>

      <div className="footer">
        <div>Build: {buildNumber}</div>
        <div>NODE_ENV: {REACT_APP_NODE_ENV}</div>
      </div>
    </div>
  );
};

export default Index;