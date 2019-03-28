class RenameAdressInPlace < ActiveRecord::Migration[5.2]
  def change
    rename_column :places, :adress, :address
  end
end
