document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var sidebar = document.querySelector('.mdc-drawer-menu');
  var body = document.body;

  if (document.querySelector('.mdc-drawer')) {
    var drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    document.querySelector('.sidebar-toggler').addEventListener('click', function () {
      drawer.open = !drawer.open;
    });
  }

  if (window.matchMedia('(max-width: 991px)').matches) {
    var dismissibleDrawer = document.querySelector('.mdc-drawer.mdc-drawer--dismissible');
    if (dismissibleDrawer && dismissibleDrawer.classList.contains('mdc-drawer--open')) {
      dismissibleDrawer.classList.remove('mdc-drawer--open');
    }
  }

  var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
  document.querySelectorAll('.mdc-drawer-item .mdc-drawer-link').forEach(function (link) {
    if (current === "") {
      if (link.getAttribute('href').includes("index.html")) {
        link.classList.add('active');
        var expansionPanel = link.closest('.mdc-expansion-panel');
        if (expansionPanel) {
          expansionPanel.classList.add('expanded');
        }
      }
    } else {
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
        var expansionPanel = link.closest('.mdc-expansion-panel');
        if (expansionPanel) {
          expansionPanel.classList.add('expanded');
          expansionPanel.style.display = 'block';
        }
      }
    }
  });

  document.querySelectorAll('[data-toggle="expansionPanel"]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      document.querySelectorAll('.mdc-expansion-panel').forEach(function (panel) {
        if (panel !== document.getElementById(toggle.getAttribute("data-target"))) {
          panel.style.display = 'none';
          panel.previousElementSibling.classList.remove('expanded');
        }
      });

      var targetPanel = document.getElementById(toggle.getAttribute("data-target"));
      if (targetPanel) {
        targetPanel.style.display = targetPanel.style.display === 'block' ? 'none' : 'block';
        toggle.classList.toggle('expanded');
      }
    });
  });

  document.querySelectorAll('.mdc-drawer-item .mdc-expansion-panel').forEach(function (panel) {
    var previousElement = panel.previousElementSibling;
    if (previousElement && previousElement.getAttribute('data-toggle') === 'expansionPanel') {
      previousElement.addEventListener('click', function () {
        previousElement.classList.toggle('expanded');
      });
    }
  });

  if (!body.classList.contains("rtl")) {
    if (document.querySelector('.mdc-drawer .mdc-drawer__content')) {
      new PerfectScrollbar('.mdc-drawer .mdc-drawer__content');
    }
  }
});
