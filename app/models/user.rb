class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable,omniauth_providers:[:twitter]

  validates :username, length: { maximum: 20 }, presence: true
  validates :password, length: { minimum: 6 }, presence: true
  validates :email, presence: true

end
