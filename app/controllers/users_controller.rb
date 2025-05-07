class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def search
    # ✅ Safe parameter binding
    query = "%#{params[:q]}%"
    @users = User.where("name LIKE ?", query)
    render json: @users
  end
end
