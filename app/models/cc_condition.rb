# The CcCondition model directly relates to the DDI3.X IfThenElseConstruct model
#
# Conditions are one of the five control constructs used in the questionnaire profile
# and used in Archivist. This control construct provides two branches for the
# instrument logic to progress. They typically represent a filter or conditional sequence
# with a questionnaire.
#
# Please visit
#
# === Properties
# * Literal
# * Logic
class CcCondition < ::ParentalConstruct
  self.primary_key = :id

  # Used to create CLOSER UserID and URNs
  URN_TYPE = 'if'

  # XML tag name
  TYPE = 'IfThenElse'

  def children
    super.select { |c| c.branch == 0 }
  end

  def fchildren
    ParentalConstruct.instance_method(:children).bind(self).call.select { |c| c.branch == 1 }
  end
  # All CcConditions require a literal
  validates :literal, presence: true

  # Returns a Hash of the attributes and properties for broadcast over
  # archivist-realtime
  #
  # @deprecated Should be replaced by leveraging the jbuilder view
  #
  # @return [Hash] Properties to be broadcast for update
  def rt_attributes
    {
        id: self.id,
        label: self.label,
        type: 'CcCondition',
        parent: self.parent.nil? ? nil : self.parent.id,
        position: self.position,
        literal: self.literal,
        logic: self.logic,
        children: self.children.select {|c| c.branch == 0}.map { |x| {id: x.id, type: x.class.name} },
        fchildren: self.children.select {|c| c.branch == 1}.map { |x| {id: x.id, type: x.class.name} }
    }
  end
end
