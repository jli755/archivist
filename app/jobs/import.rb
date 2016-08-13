class Import
  @queue = :in_and_out

  def self.perform filepath
    begin
      im = XML::CADDIES::Importer.new filepath
      im.parse
      puts 'Finished importer'
    rescue => e
      Rails.logger.fatal e
      puts e
      puts caller
    end
  end
end