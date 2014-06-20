 /* jslint node: true */
 /* global angular */
'use strict';

var directive = angular.module( 'ardroz.formBuilder', [] );

directive.directive( 'formBuilder', formBuilder );
function formBuilder () {
  return {
    restrict: 'E',
    scope: {
      form: '='
    },
    templateUrl: '/html/common/directive_templates/form_builder.html',
    link: function ( scope, element, attrs ){
      scope.editable = {};

      scope.insert = function ( type ) {
        switch ( type ) {
          case 'text_input':
            scope.form.inputs.push(
              {
                type: 'text_input',
                input_type: 'text',
                label: 'Campo de texto',
                placeholder: 'Pista'
              });
            break;
          case 'textarea_input':
            scope.form.inputs.push(
              {
                type: 'textarea_input',
                label: 'Área de texto',
                placeholder: 'Pista'
              });
            break;
          case 'prepend_text_input':
            scope.form.inputs.push(
              {
                type: 'prepend_text_input',
                input_type: 'text',
                label: 'Texto prefijo',
                prepend: 'TP',
                placeholder: 'Pista'
              });
            break;
          case 'append_text_input':
            scope.form.inputs.push(
              {
                type: 'append_text_input',
                input_type: 'text',
                label: 'Texto postfijo',
                append: 'M.N.',
                placeholder: 'Pista'
              });
            break;
          case 'inline_radios':
            scope.form.inputs.push(
              {
                type: 'inline_radios',
                label: 'Radios en línea',
                radios: []
              });
            break;
        }
      };
    }
  };
}

directive.directive( 'formElement', formElement );
formElement.$inject = ['$http', '$templateCache', '$compile', '$parse'];
function formElement ( http, templateCache, compile, parse ) {
  return {
    restrict: 'E',
    scope: {
      form: '=',
      input: '=',
      index: '=',
      editable: '='
    },
    link: function ( scope, element, attrs ){
      scope.input.editable = false;
      scope.input.required = false;
      var url = '/html/common/directive_templates/' + scope.input.type + '.html';

      http.get( url, { cache: templateCache } )
        .success( function ( template ) {
          element = element.replaceWith( compile( template )( scope ));
        });

      scope.remove = function () {
        scope.form.inputs.splice( this.index, 1 );
        angular.element('#input' + this.index).remove();
      };

      scope.inputTypes = [
        { label: 'Color', value: 'color' },
        { label: 'Contraseña', value: 'password' },
        { label: 'Correo', value: 'email' },
        { label: 'Fecha', value: 'date' },
        { label: 'Fecha y hora', value: 'datetime-local' },
        { label: 'Mes', value: 'month' },
        { label: 'Número', value: 'number' },
        { label: 'Semana', value: 'week' },
        { label: 'Texto', value: 'text' }
      ];

      scope.addRadioOrCheckbox = function () {
        if ( (/radio/g).test( this.input.type ) ) {
          this.input.radios.push({
            label: 'Radio ' + ( this.input.radios.length + 1 ),
            value: this.input.radios.length + 1
          });
        } else {

        }
      };

      scope.removeRadioOrCheckbox = function () {
        if ( (/radio/g).test( this.$parent.input.type ) ) {
          this.$parent.input.radios.splice( this.$index, 1 );
        } else {

        }
      };
    }
  };
}
