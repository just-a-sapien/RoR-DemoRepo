class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    u = User.new(params[:user])
    u.save
    render json: u
  end
end
