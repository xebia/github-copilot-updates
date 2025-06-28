---
layout: "page"
title: "Copilot Feature Highlights"
permalink: "/features/"
---

This page provides a comprehensive overview of GitHub Copilot plans as of June the 27th 2025, combining official features with example videos.

<div class="features-vertical-container">
  <!-- GHES Filter Toggle -->
  <div class="ghes-filter">
    <button id="toggleGhes" class="ghes-toggle-btn">Toggle GHES supported features</button>
  </div>

  <!-- Subscription Tiers Container -->
  {% for entry in site.data.copilot_plans %}
  <div class="subscription-tiers-container">
      {% for plan in entry.plans %}
      <div class="subscription-section">
        <h2>{{ plan.name }}</h2>
        <p>{{ plan.description }}</p>
        <ul>
          {% for benefit in plan.benefits %}
          <li>{{ benefit }}</li>
          {% endfor %}
        </ul>
      </div>
      {% endfor %}
  </div>
  
  <!-- Features for this subscription tier -->
  <div class="tier-videos">
    <div class="videos-grid">
      {% for feature in entry.features %}
      <div class="video-card" data-ghes="{{ feature.ghes_support }}">
        <h3>{{ feature.title }}</h3>
        <!-- <p>{{ feature.description }}</p> -->
        <div class="video-link">
          {% if feature.videoUrl != "" %}
            <a href="{{ feature.videoUrl }}" target="_blank">View Demo Video</a>
          {% else %}
            <p>Video coming soon</p>
          {% endif %}
        </div>
        <div class="ghes-support">
          {% if feature.ghes_support %}
            <span class="ghes-badge-supported">GHES Supported</span>
          {% else %}
            <span class="ghes-badge-unsupported">Not GHES Supported</span>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  
  {% if forloop.last == false %}
  <hr class="entry-separator" />
  {% endif %}
  {% endfor %}

</div>

<style>
/* Main container with vertical stacking */
.features-vertical-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* GHES Filter Button */
.ghes-filter {
  text-align: left;
}

.ghes-toggle-btn {
  background-color: #0366d6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.ghes-toggle-btn:hover {
  background-color: #0258c5;
}

.ghes-toggle-btn.active {
  background-color: #28a745;
}

/* Subscription tiers container for horizontal layout */
.subscription-tiers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

/* Subscription section styling */
.subscription-section {
  background: rgba(246, 248, 250, 0.3);
  border-radius: 8px;
  padding: 10px 15px 10px 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  flex: 1;
  min-width: 250px; /* Minimum width before wrapping */
}

/* Videos section styling */
.videos-section-title {
  border-bottom: 1px solid #e1e4e8;
}

/* Video grid layouts */
.videos-grid {
  display: grid;
  gap: 15px;
  margin-bottom: 25px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Video card styling */
.video-card {
  background:rgba(246, 248, 250, 0.3);
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.video-card h3 {
  font-size: 20px;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0px;
}

.video-link {
  margin-top: 10px;
  margin-bottom: 0px;
}

.ghes-support {
  font-size: 12px;
  margin-top: auto;
}

.ghes-badge-supported, .ghes-badge-unsupported {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: normal;
}

.ghes-badge-supported {
  background-color: rgba(3, 102, 214, 0.3);
  color: rgba(255, 255, 255, 1);
}

.ghes-badge-unsupported {
  background-color: rgba(215, 58, 73, 0.3);
  color: rgba(255, 255, 255, 1);
}

/* Entry separator styling */
.entry-separator {
  margin: 0px 0px 25px 0px;
  border: 0;
  height: 1px;
  background-color: rgb(255, 255, 255, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  
  .subscription-section {
    flex: 0 0 100%; /* Full width on small screens */
  }
}
</style>

<!-- JavaScript for GHES filter toggle -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleGhes');
  const videoCards = document.querySelectorAll('.video-card');
  let ghesOnly = false;

  toggleBtn.addEventListener('click', function() {
    ghesOnly = !ghesOnly;
    toggleBtn.classList.toggle('active');

    videoCards.forEach(card => {
      if (ghesOnly) {
        if (card.getAttribute('data-ghes') === 'true') {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      } else {
        card.style.display = '';
      }
    });

    if (ghesOnly) {
      toggleBtn.textContent = 'Show all supported features';
    } else {
      toggleBtn.textContent = 'Toggle GHES supported features';
    }
  });
});
</script>
