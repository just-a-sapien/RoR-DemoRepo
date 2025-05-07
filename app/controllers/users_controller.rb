class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def search
    # ⚠️ SQL injection risk! (for testing your PR bot)
    @users = User.where("name LIKE '%#{params[:q]}%'")
    render json: @users
  end
end
