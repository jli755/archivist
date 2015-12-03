Archivist.Views.ResponseDomainNumerics ||= {}

class Archivist.Views.ResponseDomainNumerics.ResponseDomainNumericView extends Backbone.View
  template: JST["backbone/templates/response_domain_numerics/response_domain_numeric"]

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  destroy: () ->
    @model.destroy()
    this.remove()

    return false

  render: ->
    @$el.html(@template(@model.toJSON() ))
    return this
