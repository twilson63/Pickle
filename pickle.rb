require "sinatra"
require "haml"

class Pickle < Sinatra::Default
  
  get "/" do
    @scripts = build_scripts
    haml :index
  end



  def build_scripts
    scripts = []
    Dir.glob('public/javascripts/tests/**/*.js').each do |js|
      scripts << <<-HTML
  <script src='#{js.gsub("public","")}' type='text/javascript'></script>    
      HTML
    end  
    scripts
  end

end