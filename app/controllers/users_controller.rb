class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    # This passes the entire params hash into update, allowing any attribute to be set
    if @user.update(params[:user])
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
