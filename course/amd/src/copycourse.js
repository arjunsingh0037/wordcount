// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Various actions on modules and sections in the editing mode - hiding, duplicating, deleting, etc.
 *
 * @module     core_course/copycourse
 * @package    core
 * @copyright  2017 Luca Bösch <luca.boesch@bfh.ch>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @since      3.4
 */
define(['jquery',
    'core/ajax',
    'core/templates',
    'core/notification',
    'core/str',
    'core/url',
    'core/yui',
    'core/modal_factory',
    'core/modal_events',
    'core/key_codes',
  ],
  function($, ajax, templates, notification, str, url, Y, ModalFactory, ModalEvents, KeyCodes) {
    var manager = {
      /**
       * Confirm copy of the specified course.
       *
       * @method  initCopyCourse
       * @param   {EventFacade}   e   The EventFacade
       */
      initCopyCourse: function(e) {
        e.preventDefault();

        // Handler for "Copy course".
          var trigger = $('.action-copy');
          var courseId = $(e.currentTarget).data('courseid');
          var modalBody = $('<div><label for="add_section_numsections"></label> ' +
            '<input id="copyfullnamecourse" size="50" maxlength="254" value=""></div>');
          modalBody.find('label').html(M.util.get_string('fullnamecourse', 'moodle') + ' ' + courseId);

          ModalFactory.create({
            title: M.util.get_string('copycourse', 'moodle'),
            type: ModalFactory.types.SAVE_CANCEL,
            body: modalBody.html()
          }, trigger)

            .done(function(modal) {
                modal.setSaveButtonText(M.util.get_string('copy', 'moodle'));
                modal.getRoot().on(ModalEvents.save, function(e) {
                  // Stop the default save button behaviour which is to close the modal.
                  // When modal "Copy" button is pressed.
                  e.preventDefault();
                  // Do your form validation here.
              });
            });
      },

      /**
       * Setup the course copy UI.
       *
       * @method          setup
       */
      setup: function() {
        $('body').delegate('[class="action-copy"]', 'click', manager.initCopyCourse);
      }
    };

    return /** @alias module:core_course/copycourse */ {
      /**
       * Setup the course copy UI.
       *
       * @method          setup
       */
      setup: manager.setup
    };
  });